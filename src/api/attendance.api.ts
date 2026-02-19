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
      return MockApiClient.getAttendanceRecords(sectionId, date);
    }
    const url = date
      ? `/course-sections/${sectionId}/attendance?date=${date}`
      : `/course-sections/${sectionId}/attendance`;
    const response = await apiClient.get(url);
    return response.data;
  },

  getByStudentId: async (studentId: string, sectionId?: string): Promise<AttendanceRecord[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAttendanceRecordsByStudent(studentId, sectionId);
    }
    const url = sectionId
      ? `/students/${studentId}/attendance?section_id=${sectionId}`
      : `/students/${studentId}/attendance`;
    const response = await apiClient.get(url);
    return response.data;
  },

  getById: async (id: string): Promise<AttendanceRecord> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.getAttendanceRecord(id);
    }
    const response = await apiClient.get(`/attendance-records/${id}`);
    return response.data;
  },

  mark: async (data: CreateAttendanceRecordPayload): Promise<AttendanceRecord> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.createAttendanceRecord(data);
    }
    const response = await apiClient.post('/attendance-records', data);
    return response.data;
  },

  markBulk: async (records: CreateAttendanceRecordPayload[]): Promise<AttendanceRecord[]> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return Promise.all(records.map(record => MockApiClient.createAttendanceRecord(record)));
    }
    const response = await apiClient.post('/attendance-records/bulk', { records });
    return response.data;
  },

  update: async (id: string, data: UpdateAttendanceRecordPayload): Promise<AttendanceRecord> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.updateAttendanceRecord(id, data);
    }
    const response = await apiClient.put(`/attendance-records/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ id: string }> => {
    if (MOCK_CONFIG.USE_MOCK_DATA) {
      return MockApiClient.deleteAttendanceRecord(id);
    }
    const response = await apiClient.delete(`/attendance-records/${id}`);
    return response.data;
  },
};
