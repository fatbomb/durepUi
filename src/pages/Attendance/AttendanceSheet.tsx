import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PageMeta from '../../components/common/PageMeta';
import api from '../../api';

interface Student {
    id: string;
    name: string;
    roll_no: string;
    registration_no: string;
    rev_attendance: number; // 0 for absent, 1 for present
}

interface ClassDetails {
    name: string;
    class_date: string;
    start_time: string;
    end_time: string;
    room: string;
}

const AttendanceSheet: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [students, setStudents] = useState<Student[]>([]);
    const [classDetails, setClassDetails] = useState<ClassDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem('access_token');

                // Fetch class details
                const classDetailsResponse = await api.post(
                    '/api/get_class',
                    { class_id: Number(id) },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (classDetailsResponse.data[0]) {
                    const details = classDetailsResponse.data[0];
                    setClassDetails({
                        name: details.full_course_name,
                        class_date: details.class_date,
                        start_time: details.start_time,
                        end_time: details.end_time,
                        room: details.room,
                    });
                }

                // Fetch the list of all students in the class
                const studentsResponse = await api.post(
                    "/api/get_class_students",
                    { class_id: Number(id) },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                // Fetch the attendance data for this class
                let attendanceRecords: any[] = [];
                try {
                    const attendanceResponse = await api.post(
                        '/api/get_attendance',
                        { class_id: Number(id) },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (attendanceResponse.data && Array.isArray(attendanceResponse.data.students)) {
                        attendanceRecords = attendanceResponse.data.students;
                    }
                } catch (err: any) {
                    if (err?.response?.status !== 404) {
                        throw err;
                    }
                }

                // Merge student list with attendance data
                if (studentsResponse.data && Array.isArray(studentsResponse.data)) {
                    const mergedStudents = studentsResponse.data.map((student: any) => {
                        const attendance = attendanceRecords.find(att => Number(att.std_id) === Number(student.id));
                        return {
                            id: String(student.id),
                            name: student.student_name || 'Unknown Student',
                            roll_no: student.roll_no || 'N/A',
                            registration_no: student.registration_no || 'N/A',
                            rev_attendance: attendance ? Number(attendance.rev_attendance) : 0,
                        };
                    });
                    setStudents(mergedStudents);
                } else {
                    setStudents([]);
                }

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch class or student data.');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, [id]);

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
        if (!start || !end) return "N/A";
        const [startH, startM] = start.split(":").map(Number);
        const [endH, endM] = end.split(":").map(Number);
        const diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
        if (isNaN(diffMinutes) || diffMinutes < 0) return "N/A";
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        let result = '';
        if (hours > 0) {
            result += `${hours} hour${hours > 1 ? 's' : ''} `;
        }
        if (minutes > 0) {
            result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
        return result.trim() || '0 minutes';
    };

    const getPresentCount = (): number => {
        return students.filter(s => s.rev_attendance === 1).length;
    };

    const getAbsentCount = (): number => {
        return students.filter(s => s.rev_attendance !== 1).length;
    };

    const exportToPDF = () => {
        if (!classDetails) return;

        const doc = new jsPDF();
        const pageW = doc.internal.pageSize.getWidth();

        // Main Title
        doc.setFontSize(16);
        doc.text(classDetails.name, pageW / 2, 15, { align: 'center' });

        // Sub-header
        doc.setFontSize(10);
        const subHeader = ` ${classDetails.room || "TBA"} | ${getTimeDifference(classDetails.start_time, classDetails.end_time)}`;
        doc.text(subHeader, pageW / 2, 22, { align: 'center' });

        // Attendance Sheet Title
        doc.setFontSize(12).setFont(undefined, 'bold');
        doc.text("Attendance Sheet", pageW / 2, 30, { align: 'center' });
        doc.setFont(undefined, 'normal');

        // Date and Time
        doc.setFontSize(10);
        doc.text(`Date: ${formatDate(classDetails.class_date)}`, 14, 35);
        doc.text(`Time: ${formatTime(classDetails.start_time)} - ${formatTime(classDetails.end_time)}`, pageW - 14, 35, { align: 'right' });


        (doc as any).autoTable({
            startY: 40,
            head: [['S/L', 'Roll No', 'Student Name', 'Registration No', 'Status']],
            body: students.map((student, index) => [
                index + 1,
                student.roll_no,
                student.name,
                student.registration_no,
                student.rev_attendance === 1 ? 'Present' : student.rev_attendance === 0 ? 'Absent':'-',
            ]),
            theme: 'grid',
            headStyles: { fillColor: [22, 160, 133] },
            didParseCell: (data: any) => {
                if (data.column.dataKey === 4 && data.cell.section === 'body') { // 4 is the 'Status' column
                    if (data.cell.raw === 'Present') {
                        data.cell.styles.textColor = [0, 128, 0]; // Green
                    } else if (data.cell.raw === 'Absent') {
                        data.cell.styles.textColor = [255, 0, 0]; // Red
                    }
                }


            },
        });

        // Add summary page
        doc.addPage();
        doc.setFontSize(14);
        doc.text("Attendance Summary", pageW / 2, 10, { align: 'center' });

        (doc as any).autoTable({
            startY: 20,
            head: [['Description', 'Count']],
            body: [
                ['Total Present', getPresentCount()],
                ['Total Absent', getAbsentCount()],
                ['Total Students', students.length],
            ],
            theme: 'grid',
        });

        doc.save(`${classDetails.name}_${formatDate(classDetails.class_date)}_attendance.pdf`);
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (

        <div className="min-h-screen bg-gray-50 p-4 pb-20">
            <PageMeta title="Attendance Sheet" description="Attendance Sheet" />
            <div className="max-w-7xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-center mb-4">
                    {classDetails ? (
                        <>
                            <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
                                {classDetails.name}
                            </h1>
                            <div className="flex justify-center gap-4 text-sm text-gray-600 mb-3 text-center mt-1">
                                <span>📍 {classDetails.room || "TBA"}</span>
                                <span>⏱ { getTimeDifference(classDetails.start_time, classDetails.end_time)}</span>
                            </div>
                        </>
                    ) : (
                        <p>Loading class details...</p>
                    )}

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
                    {classDetails ? (
                        <>
                            <div className="grid grid-cols-3 gap-4 mt-3 bg-gray-50 p-2 rounded-lg items-center">
                                <div className="text-left text-sm" >
                                    Date: {formatDate(classDetails?.class_date)}
                                </div>
                                <div >
                                    <h3 className="font-semibold">Attendance Sheet</h3>
                                </div>
                                <div className="text-right text-sm" >
                                  Time: {formatTime(classDetails.start_time)} - {formatTime(classDetails.end_time)}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Loading class details...</p>
                    )}
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    {students.length === 0 ? (
                        <p className="text-center">No student data found for this class.</p>
                    ) : (
                        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/L</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map((student, index) => (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.roll_no}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.registration_no}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                student.rev_attendance === 1 ? 'bg-green-500 text-white' : student.rev_attendance === 0 ?'bg-red-500 text-white':'bg-gray-500 text-white'
                                            }`}>
                                                {student.rev_attendance === 1 ? 'Present' : student.rev_attendance === 0 ? 'Absent':''}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div className="fixed top-20  right-8 flex gap-2">

                {students.length > 0 && (
                    <>
                        {/*<button*/}
                        {/*    onClick={exportToPDF}*/}
                        {/*    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"*/}
                        {/*>*/}
                        {/*    Download PDF*/}
                        {/*</button>*/}
                        <button
                            onClick={() => navigate('/take-attendance/'+id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
                        >
                            Update
                        </button>
                    </>
                )}
                <button
                    onClick={() => navigate('/allclasses')}
                    className="bg-red-300 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition"
                >
                    Back
                </button>

            </div>
            <button onClick={exportToPDF} className="fixed bottom-24 right-6 bg-white border-2 border-indigo-600 text-indigo-600 px-5 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 text-sm font-semibold">
                <span>↓</span>
                Export
            </button>
        </div>
    );
};

export default AttendanceSheet;
