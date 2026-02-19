import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import PageMeta from "../../components/common/PageMeta.tsx";
import api from "../../api";

interface Student {
    id: string;
    name: string;
    initials: string;
    registration_no: string;
    roll_no: string;
    // is_present: number;        // 0 or 1
    rev_attendance: number;    // stored as string ('' when missing)
}
interface ClassDetails {
    name: string;
    code: string;
    section: string;
    room: string;
    class_date: string,
    start_time: string,
    end_time: string,
    attendance_type: string,
    topic: string,
}

type AttendanceStatus = 'present' | 'absent';
type ViewMode = 'list' | 'card';

interface AttendanceData {
    [studentId: string]: AttendanceStatus;
}

const TakeAttendance: React.FC = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [attendanceData, setAttendanceData] = useState<AttendanceData>({});
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [students, setStudents] = useState<Student[]>([]);
    const [hasAttendance, setHasAttendance] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const [activeButton, setActiveButton] = useState<'present' | 'absent' | null>(null);
    const [classDetails, setClassDetails] = useState<ClassDetails | null>(null);


    useEffect(() => {
        const fetchStudentsAndClassDetails = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("access_token");

                // Fetch class details
                const classDetailsResponse = await api.post(
                    "/api/get_class",
                    { class_id: Number(id) },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (classDetailsResponse.data[0]) {
                    const details = classDetailsResponse.data[0];
                    setClassDetails({
                        name: details.full_course_name,
                        code: details.class_code,
                        section: details.section,
                        room: details.room,
                        class_date: details.class_date,
                        start_time: details.start_time,
                        end_time: details.end_time,
                        attendance_type: details.attendance_type,
                        topic: details.topic,
                    });
                }


                const response = await api.post(
                    "/api/get_class_students",
                    { class_id: Number(id) },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Try to fetch attendance, but handle 404 / "not found" gracefully
                let attendanceList: any[] = [];
                try {
                    const responseAttendance = await api.post(
                        "/api/get_attendance",
                        { class_id: Number(id) },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const attendanceResp = responseAttendance.data;
                    if (attendanceResp && Array.isArray(attendanceResp.students)) {
                        attendanceList = attendanceResp.students;
                        setHasAttendance(attendanceList.length > 0);
                    } else {
                        // server returned a body but not the expected shape (maybe { error: "..." })
                        attendanceList = [];
                        setHasAttendance(false);
                        if (attendanceResp?.error) {
                            console.warn("Get attendance:", attendanceResp.error);
                            setError(String(attendanceResp.error));
                        }
                    }
                } catch (err: any) {
                    // If the endpoint returns 404, treat as "no attendance yet"
                    if (err?.response?.status === 404) {
                        attendanceList = [];
                        setHasAttendance(false);
                        // optional: surface a friendly message but not treat as fatal
                        setError("No attendance record found (treated as empty).");
                    } else {
                        // rethrow so outer catch handles network / auth issues
                        throw err;
                    }
                }
                const initialAttendance: AttendanceData = {};
                // Map students and attach attendance defaults
                const apiStudents = response.data?.map((s: any) => {
                    // typescript
                    const att = attendanceList.find((a: any) => Number(a.std_id) === Number(s.id));
                    const serverIsPresent = att ? Number(att.rev_attendance) : '';
                    // @ts-ignore
                    initialAttendance[String(s.id)] =
                        serverIsPresent === '' ? 'None' : serverIsPresent === 1 ? 'present' : 'absent';
                    return {
                        id: String(s.id),
                        registration_no: s.registration_no ? String(s.registration_no) : '',
                        roll_no: s.roll_no ? String(s.roll_no) : '',
                        name: s.student_name || "Unknown Student",
                        initials: s.student_name
                            ? s.student_name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()
                            : "N/A",
                        // is_present:  serverRev,
                        rev_attendance: serverIsPresent,
                    };
                });
                setStudents(apiStudents || []);
                // set attendance state once, merge with any existing keys to avoid overwriting user changes
                setAttendanceData(prev => ({ ...initialAttendance, ...prev }));
            } catch (err) {
                console.error("Error fetching students or attendance:", err);
                setError("Failed to load student data.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudentsAndClassDetails();
    }, [id]);

    useEffect(() => {
        const savedMode = localStorage.getItem('attendanceView') as ViewMode | null;
        if (savedMode) setViewMode(savedMode);
    }, []);


    const markAttendance = (studentId: string, status: AttendanceStatus): void => {
        setAttendanceData({ ...attendanceData, [studentId]: status });
    };


    const saveAttendance = async (): Promise<void> => {
        const markedCount = Object.keys(attendanceData).length;
        if (markedCount === 0) {
            alert('Please mark attendance for at least one student');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("access_token");

            // Prepare attendance records
            const attendanceRecords = Object.entries(attendanceData).map(([studentId, status]) => ({
                std_id: Number(studentId),
                reg_no: studentId,
                is_present: status === 'present' ? 1 : 0,
            }));
            const attendanceDataNew = {
                class_id: Number(id),
                attendance_date: "2025-11-12",
                attendance: attendanceRecords  // Changed from 'attendances' to 'attendance'
            };

            const response = await api.post(
                "/api/store_attendance",
                attendanceDataNew,  // Send directly, not wrapped in another object
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                alert(`Attendance saved successfully!\n${markedCount} of ${students.length} students marked.`);
                navigate('/allclasses');
            }
        } catch (err: any) {
            console.error("Error saving attendance:", err);
            const errorMessage = err.response?.data?.message || "Failed to save attendance. Please try again.";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // New: updateAttendance for existing attendance records
    const updateAttendance = async (): Promise<void> => {
        try {
            setLoading(true);
            const token = localStorage.getItem("access_token");
            const attendancePayload = students.map((s) => {
                const attendanceStatus = attendanceData[s.id];
                const revAttendanceUI = attendanceStatus ? (attendanceStatus === 'present' ? 1 : 0) : 0;
                return {
                    std_id: Number(s.id),
                    rev_attendance: Number(revAttendanceUI),
                };
            });

            const payload = {
                class_id: Number(id),
                attendance: attendancePayload,
            };

            const response = await api.post(
                "/api/update_attendance",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                alert("Attendance updated successfully.");
                // Optionally refresh data
                //window.location.reload();
                navigate('/allclasses');
            }
        } catch (err: any) {
            console.error("Error updating attendance:", err);
            const errorMessage = err.response?.data?.message || "Failed to update attendance. Please try again.";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getPresentCount = (): number => {
        return Object.values(attendanceData).filter((status) => status === 'present').length;
    };

    const getAbsentCount = (): number => {
        return Object.values(attendanceData).filter((status) => status === 'absent').length;
    };

    const filteredStudents: Student[] = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.id.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return "N/A";
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const minute = parseInt(minutes, 10);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${formattedHour}:${String(minute).padStart(2, '0')} ${ampm}`;
    };

    const getTimeDifference = (start: string, end: string): string => {
        const [startH, startM] = start.split(":").map(Number);
        const [endH, endM] = end.split(":").map(Number);
        const diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        return `${hours > 0 ? hours + " hours " : ""}${minutes} minutes`;
    };
    return (

        <div className="min-h-screen bg-gray-50 pb-20">
            <PageMeta title="Take Attendance" description="Take Attendance" />
            {/* Header */}
            <div className="sticky top-0 z-50  ">
            <div className="max-w-7xl mx-auto space-y-4">
                {/* Header Section */}

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-center">
                    {/* Title */}
                    {classDetails ? (
                        <>
                            <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
                                {classDetails.name}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {formatDate(classDetails.class_date)} - ({formatTime(classDetails.start_time)} to {formatTime(classDetails.end_time)})
                            </p>
                            <div className="flex justify-center gap-4 text-sm text-gray-600 mb-3 text-center mt-1">
                                <span>📍 {classDetails.room || "TBA"}</span>
                                <span>⏱ { getTimeDifference(classDetails.start_time, classDetails.end_time)}</span>
                            </div>
                        </>
                    ) : (
                        <p>Loading class details...</p>
                    )}

                    {/* Stats */}
                    <div className="flex justify-center gap-4 mt-3 flex-wrap">
                        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-medium border border-green-200">
                            ✓ {getPresentCount()} Present
                        </div>
                        <div className="bg-red-50 text-red-700 px-4 py-2 rounded-full text-xs font-medium border border-red-200">
                            ✗ {getAbsentCount()} Absent
                        </div>
                        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-medium border border-blue-200">
                            📊 {students.length} Total
                        </div>
                    </div>
                </div>


                {/* Search + Buttons Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-3 shadow-sm">
                    {/* Search Box */}
                    <input
                        type="text"
                        className="w-full md:w-1/2 px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Buttons */}
                    <div className="flex space-x-3">
                        <button
                            onClick={() => {
                                const newData: AttendanceData = {};
                                students.forEach((s) => (newData[s.id] = 'present'));
                                setAttendanceData(newData);
                                setActiveButton('present');
                            }}
                            className={`px-3 py-2 border-2 rounded-lg text-sm font-medium transition 
            ${
                                activeButton === 'present'
                                    ? 'bg-green-500 border-green-500 text-white shadow-md'
                                    : 'border-green-500 text-green-500 hover:bg-green-50'
                            }`}
                        >
                            ✓ All Present
                        </button>

                        <button
                            onClick={() => {
                                const newData: AttendanceData = {};
                                students.forEach((s) => (newData[s.id] = 'absent'));
                                setAttendanceData(newData);
                                setActiveButton('absent');
                            }}
                            className={`px-3 py-2 border-2 rounded-lg text-sm font-medium transition 
            ${
                                activeButton === 'absent'
                                    ? 'bg-red-500 border-red-500 text-white shadow-md'
                                    : 'border-red-500 text-red-500 hover:bg-red-50'
                            }`}
                        >
                            ✗ All Absent
                        </button>
                    </div>
                </div>
            </div>
        </div>



    {viewMode === 'list' ? (
                // List View
                <div className="max-w-7xl mx-auto pt-4 ">
                    {/* Students List */}
                    <div className="space-y-3">
                        {filteredStudents.map((student) => {
                            const currentStatus: AttendanceStatus | undefined =
                                attendanceData[student.id] ??
                                (student.rev_attendance == 1 ? 'present' : student.rev_attendance === 0 ? 'absent' : '');

                            return (
                                <div key={student.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {student.initials}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 {student.id}">{student.name} </div>
                                            <div className="text-sm text-gray-500">{student.roll_no} ({student.registration_no})</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => markAttendance(student.id, 'present')}
                                            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition ${
                                                currentStatus === 'present'
                                                    ? 'bg-green-500 border-green-500 text-white'
                                                    : 'border-green-500 text-green-500'
                                            }`}
                                        >
                                            ✓
                                        </button>

                                        <button
                                            onClick={() => markAttendance(student.id, 'absent')}
                                            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition ${
                                                currentStatus === 'absent'
                                                    ? 'bg-red-500 border-red-500 text-white'
                                                    : 'border-red-500 text-red-500'
                                            }`}
                                        >
                                            ✗
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            ) : (
                <div></div>
            )}

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-70 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-3">
                    {hasAttendance ? (
                        <button
                            onClick={updateAttendance}
                            className="py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold"
                        >
                            Update Attendance
                        </button>
                    ) : (
                        <button
                            onClick={saveAttendance}
                            className="py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold"
                        >
                            Save Attendance
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/allclasses')}
                        className="py-3 border-2 border-gray-300 bg-red-200 text-gray-600 rounded-xl font-semibold"
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TakeAttendance;