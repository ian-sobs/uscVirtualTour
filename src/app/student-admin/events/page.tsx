'use client';

import { useState } from 'react';
import { Event } from '@/types';

export default function StudentEventsPage() {
  // Mock data - organizations this student is a member of
  const [studentOrganizations] = useState([
    { id: 1, name: 'Supreme Student Council' },
    { id: 2, name: 'Computer Science Society' },
    { id: 3, name: 'Carolinian Dance Troupe' },
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: 'Student Council Meeting',
      description: 'Monthly student council meeting',
      date_time_start: '2024-12-15T14:00',
      date_time_end: '2024-12-15T16:00',
      org_id: 1,
      visibility: 'only_students',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date_time_start: '',
    date_time_end: '',
    custom_marker: '',
    org_id: 0,
    visibility: 'only_students' as 'everyone' | 'only_students' | 'only_organization_members',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdd = () => {
    setEditingEvent(null);
    setFormData({
      name: '',
      description: '',
      date_time_start: '',
      date_time_end: '',
      custom_marker: '',
      org_id: 0,
      visibility: 'only_students',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      description: event.description || '',
      date_time_start: event.date_time_start,
      date_time_end: event.date_time_end || '',
      custom_marker: event.custom_marker || '',
      org_id: event.org_id || 0,
      visibility: event.visibility || 'only_students',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((e) => e.id !== id));
      // TODO: Call API to delete
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(
        events.map((ev) =>
          ev.id === editingEvent.id ? { ...ev, ...formData } : ev
        )
      );
    } else {
      const newEvent: Event = {
        id: Math.max(0, ...events.map((e) => e.id)) + 1,
        ...formData,
      };
      setEvents([...events, newEvent]);
    }
    // TODO: Call API to create/update
    setIsModalOpen(false);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Events</h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-900">Manage your organization events</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-700 text-white rounded-lg hover:bg-green-800 font-bold cursor-pointer whitespace-nowrap"
        >
          + Add Event
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-2 sm:gap-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Event
              </th>
              <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Start Time
              </th>
              <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                End Time
              </th>
              <th className="hidden lg:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Visibility
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">{event.name}</div>
                  <div className="text-xs text-gray-600 truncate max-w-xs">{event.description}</div>
                </td>
                <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="text-xs sm:text-sm text-gray-900">
                    {studentOrganizations.find(org => org.id === event.org_id)?.name || 'No Organization'}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="text-xs sm:text-sm text-gray-900">
                    {new Date(event.date_time_start).toLocaleString()}
                  </div>
                </td>
                <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <div className="text-xs sm:text-sm text-gray-900">
                    {event.date_time_end ? new Date(event.date_time_end).toLocaleString() : 'N/A'}
                  </div>
                </td>
                <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {event.visibility}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 hover:text-blue-900 mr-2 sm:mr-4 cursor-pointer font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-900 cursor-pointer font-bold"
                  >
                    <span className="hidden sm:inline">Delete</span>
                    <span className="sm:hidden">Del</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                {editingEvent ? 'Edit Event' : 'Add Event'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Organization *
                  </label>
                  <select
                    required
                    value={formData.org_id}
                    onChange={(e) => setFormData({ ...formData, org_id: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black cursor-pointer"
                  >
                    <option value={0}>Select organization</option>
                    {studentOrganizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Choose which organization is hosting this event
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                      Start Time *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.date_time_start}
                      onChange={(e) => setFormData({ ...formData, date_time_start: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.date_time_end}
                      onChange={(e) => setFormData({ ...formData, date_time_end: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Visibility
                  </label>
                  <select
                    value={formData.visibility}
                    onChange={(e) => setFormData({ ...formData, visibility: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black cursor-pointer"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="only_students">Students Only</option>
                    <option value="only_organization_members">Organization Members Only</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-700 text-white rounded-lg hover:bg-green-800 font-bold cursor-pointer"
                  >
                    {editingEvent ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-green-700 text-green-700 rounded-lg hover:bg-green-50 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
