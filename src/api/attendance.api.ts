// Attendance API
import { apiClient } from '../lib/apiClient';
import { MockApiClient } from '../lib/mockApiClient';
import { MOCK_CONFIG } from '../config/mock.config';
import type {
  AttendanceRecord,
  CreateAttendanceRecordPayload,
  UpdateAttendanceRecordPayload,
} from '../types/api.types';

export const attendanceApi = {
  getBySectionId: async (sectionId: string, date?: string): Promise<AttendanceRecord[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAttendanceRecords(sectionId, undefined, date);
    }
    const url = date
      ? `/course-sections/${sectionId}/attendance?date=${date}`
      : `/course-sections/${sectionId}/attendance`;
    return apiClient.get<AttendanceRecord[]>(url);
  },

  getByStudentId: async (studentId: string, sectionId?: string): Promise<AttendanceRecord[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAttendanceRecords(sectionId, studentId);
    }
    const url = sectionId
      ? `/students/${studentId}/attendance?section_id=${sectionId}`
      : `/students/${studentId}/attendance`;
    return apiClient.get<AttendanceRecord[]>(url);
  },

  getById: async (id: string): Promise<AttendanceRecord> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      const records = await MockApiClient.getAttendanceRecords();
      const record = records.find(r => r.id === id);
      if (!record) throw new Error('Attendance record not found');
      return record;
    }
    return apiClient.get<AttendanceRecord>(`/attendance-records/${id}`);
  },

  mark: async (data: CreateAttendanceRecordPayload): Promise<AttendanceRecord> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createAttendanceRecord(data);
    }
    return apiClient.post<AttendanceRecord>('/attendance-records', data);
  },

  markBulk: async (records: CreateAttendanceRecordPayload[]): Promise<AttendanceRecord[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return Promise.all(records.map(record => MockApiClient.createAttendanceRecord(record)));
    }
    return apiClient.post<AttendanceRecord[]>('/attendance-records/bulk', { records });
  },

  update: async (id: string, data: UpdateAttendanceRecordPayload): Promise<AttendanceRecord> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateAttendanceRecord(id, data);
    }
    return apiClient.put<AttendanceRecord>(`/attendance-records/${id}`, data);
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteAttendanceRecord(id);
    }
    return apiClient.delete<{ id: string }>(`/attendance-records/${id}`);
  },
};
