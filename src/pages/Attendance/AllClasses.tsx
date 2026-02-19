import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta.tsx";
import api from "../../api";

// ✅ API Class Item type
interface ClassItem {
    id: number;
    teacher_id?: number;
    course_id?: number;
    course_section_id?: number;
    class_date: string; // e.g. "2025-12-29"
    topic?: string;
    start_time: string; // e.g. "13:00:00"
    end_time: string;   // e.g. "13:30:00"
    name?: string;
    code?: string;
    time?: string;
    students?: number;
    room?: string;
    duration?: string;
    status?: "completed" | "pending" | "upcoming" | "missed";
    avgAttendance?: number;
    day?: "Today" | "Tomorrow";
}

const AllClasses: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // ✅ Example date range
    const today = new Date();
    const classStartDate = today.toISOString().split('T')[0]; // "2024-11-12"

// Get tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const classEndDate = tomorrow.toISOString().split('T')[0]; // "2024-11-13"

    // ✅ Fetch classes from API
    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("access_token");

                const response = await api.post(
                    "/api/get_class",
                    {
                        class_start_date: classStartDate,
                        class_end_date: classEndDate,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );


                if (!response.data) throw new Error("Failed to fetch classes");

                const data: ClassItem[] = response.data;

                const formatTime = (time: string): string => {
                    const [hourStr, minuteStr] = time.split(":");
                    let hour = parseInt(hourStr, 10);
                    const minute = parseInt(minuteStr, 10);
                    const ampm = hour >= 12 ? "PM" : "AM";
                    hour = hour % 12 || 12; // convert 0 → 12, 13 → 1, etc.
                    return `${hour.toString().padStart(2, "0")}:${minute
                        .toString()
                        .padStart(2, "0")} ${ampm}`;
                };

                // ✅ Map API response to your existing structure
                const mappedClasses: ClassItem[] = data.map((cls) => {
                    // Determine if class is Today / Tomorrow
                    const today = new Date();
                    const classDate = new Date(cls.class_date);
                    let day: "Today" | "Tomorrow" = "Today";
                    if (
                        classDate.getDate() === today.getDate() + 1 &&
                        classDate.getMonth() === today.getMonth() &&
                        classDate.getFullYear() === today.getFullYear()
                    ) {
                        day = "Tomorrow";
                    }

                    const getTimeDifference = (start: string, end: string): string => {
                        const [startH, startM] = start.split(":").map(Number);
                        const [endH, endM] = end.split(":").map(Number);
                        const diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
                        const hours = Math.floor(diffMinutes / 60);
                        const minutes = diffMinutes % 60;
                        return `${hours > 0 ? hours + " hours " : ""}${minutes} minutes`;
                    };

                    return {
                        ...cls,
                        name: cls.full_course_name || "-",
                        code: `Course ${cls.course_id} - Section ${cls.course_section_id}`,
                        time: getTimeDifference(cls.start_time, cls.end_time),
                        id: cls.id,
                        class_date: cls.class_date,
                        start_time: formatTime(cls.start_time),
                        end_time: formatTime(cls.end_time),
                        students: 0, // default can fetch real student count if available
                        room: cls.room,
                        attendance_type: cls.attendance_type,
                        duration: getTimeDifference(cls.start_time, cls.end_time), // default
                        status: cls.attendance_status==0?"pending":'completed',
                        avgAttendance: 0,
                        day,
                    };
                });

                // ✅ Sort by date
                mappedClasses.sort(
                    (a, b) => new Date(a.class_date).getTime() - new Date(b.class_date).getTime()
                );

                setClasses(mappedClasses);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [classStartDate, classEndDate]);

    // ✅ Filter by search query
    const filteredClasses = classes.filter(
        (classItem) =>
            classItem.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            classItem.code?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ✅ Status style function
    const getStatusStyle = (status: ClassItem["status"]): string => {
        const styles: Record<ClassItem["status"], string> = {
            completed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            upcoming: "bg-blue-100 text-blue-800",
            missed: "bg-red-100 text-red-800",
        };
        return status ? styles[status] : "bg-gray-100 text-gray-800";
    };

    // ✅ Attendance color function
    const getAttendanceColor = (rate: number | undefined): string => {
        if (!rate) return "text-gray-600";
        if (rate >= 90) return "text-green-600";
        if (rate >= 70) return "text-yellow-600";
        return "text-red-600";
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
    const handleDelete = async (classId: number) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            console.log(classId);
            try {
                const token = localStorage.getItem("access_token");
                await api.post('/api/delete_class', { class_id: classId }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Refresh the class list after deletion
               fetchClasses();
            } catch (err) {
                console.log('Failed to delete class:', err);
                alert('Failed to delete class. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <PageMeta title="All Class" description="All Class" />

            {/* Search */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    placeholder="Search classes..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Loading/Error */}
            {loading && <p className="text-center mt-4">Loading classes...</p>}
            {error && <p className="text-center mt-4 text-red-600">{error}</p>}

            {/* Classes List */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                {(["Today", "Tomorrow"] as const).map((day) => {
                    const dayClasses = filteredClasses.filter((c) => c.day === day);
                    if (dayClasses.length === 0) return null;

                    return (
                        <div key={day} className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">{day}</h2>
                                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    {dayClasses.length} Classes
                                </span>
                            </div>

                            <div className="space-y-4">
                                {dayClasses.map((classItem) => (
                                    <div
                                        key={classItem.id}

                                        className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <div  onClick={() => navigate("/take-attendance/" + classItem.id )} className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                                    {classItem.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">{ classItem.topic?'Topic: '+classItem.topic:''}</p>
                                            </div>
                                            <div className="border-2 text-black px-4 py-2 rounded-lg text-sm font-semibold">
                                                {classItem.start_time} to {classItem.end_time}
                                            </div>

                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                            <span>👥 {classItem.students || 0} Students</span>
                                            <span>📍 {classItem.room || "TBA"}</span>
                                            <span>⏱ {classItem.duration || "60 mins"}</span>
                                        </div>

                                        <div className="flex justify-between items-center pt-3">
                                            <div className="flex items-center gap-4">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                                                        classItem.status
                                                    )}`}
                                                >
                                                    {classItem.status?.charAt(0).toUpperCase() +
                                                        classItem.status?.slice(1)}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    Avg:{" "}
                                                    <span
                                                        className={`font-semibold ${getAttendanceColor(
                                                            classItem.avgAttendance
                                                        )}`}
                                                    >
                                                        {classItem.avgAttendance || 0}%
                                                    </span>
                                                </span>
                                            </div>

                                                <div className="flex items-center gap-2">

                                                    <button onClick={() => navigate("/take-attendance/" + classItem.id )}
                                                        className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">
                                                        {classItem.status && classItem.status =='pending' ? ( 'Take'):('Update')} Attendance
                                                    </button>

                                                    {classItem.status && classItem.status =='completed' ? (
                                                        <button onClick={() => navigate("/attendance-sheet/" + classItem.id )}
                                                            className="bg-white border border-indigo-600 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-indigo-50 transition-colors">
                                                            Attendance Sheet
                                                        </button>
                                                    ) : (
                                                        ''
                                                    )}


                                                    {classItem.status && classItem.status =='pending' ? (
                                                        <button onClick={() => navigate("/update-class/" + classItem.id )}
                                                                className="bg-success-600 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">
                                                            Update
                                                        </button>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {classItem.status && classItem.status =='pending' ? (
                                                        <button onClick={() => handleDelete(classItem.id)}
                                                                className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors">
                                                            Delete
                                                        </button>
                                                    ) : (
                                                    ''
                                                    )}




                                                </div>



                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => navigate("/create-class")}
                className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center text-3xl font-light"
            >
                +
            </button>

        </div>
    );
};

export default AllClasses;
