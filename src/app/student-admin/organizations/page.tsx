'use client';

import { useState } from 'react';

interface Organization {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  is_student_org?: boolean;
  member_count?: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  student_id: string;
  can_post_events: boolean;
  can_add_members: boolean;
  can_remove_members: boolean;
  can_set_member_permissions: boolean;
}

export default function StudentOrganizationsPage() {
  const currentUserId = '0'; // Mock current user ID

  // Mock data - student can only see their own organizations
  const [organizations] = useState<Organization[]>([
    { 
      id: 1, 
      name: 'Supreme Student Council', 
      description: 'Main governing body of students',
      logo: '', 
      is_student_org: true,
      member_count: 25
    },
    { 
      id: 2, 
      name: 'CISCO', 
      description: 'Student organization for DCISM students',
      logo: '', 
      is_student_org: true,
      member_count: 45
    },
  ]);

  // Mock members per organization
  const [orgMembers] = useState<Record<number, User[]>>({
    1: [ // Supreme Student Council
      {
        id: '0',
        name: 'Current User (You)',
        email: '21000000@usc.edu.ph',
        student_id: '21000000',
        can_post_events: true,
        can_add_members: true,
        can_remove_members: true,
        can_set_member_permissions: true,
      },
      {
        id: '1',
        name: 'Juan Dela Cruz',
        email: '21010234@usc.edu.ph',
        student_id: '21010234',
        can_post_events: true,
        can_add_members: true,
        can_remove_members: false,
        can_set_member_permissions: false,
      },
      {
        id: '3',
        name: 'Pedro Garcia',
        email: '21012345@usc.edu.ph',
        student_id: '21012345',
        can_post_events: false,
        can_add_members: false,
        can_remove_members: false,
        can_set_member_permissions: false,
      },
    ],
    2: [ // CISCO
      {
        id: '0',
        name: 'Current User (You)',
        email: '21000000@usc.edu.ph',
        student_id: '21000000',
        can_post_events: true,
        can_add_members: true,
        can_remove_members: true,
        can_set_member_permissions: true,
      },
      {
        id: '2',
        name: 'Maria Santos',
        email: '21005678@usc.edu.ph',
        student_id: '21005678',
        can_post_events: true,
        can_add_members: false,
        can_remove_members: false,
        can_set_member_permissions: false,
      },
    ],
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrg, setExpandedOrg] = useState<number | null>(null);
  const [memberSearchQuery, setMemberSearchQuery] = useState<Record<number, string>>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [addUserEmail, setAddUserEmail] = useState('');

  const handleEditPermissions = (user: User, orgId: number) => {
    setEditingUser(user);
    setSelectedOrgId(orgId);
    setIsEditModalOpen(true);
  };

  const handleRemoveUser = (userId: string, orgId: number) => {
    if (confirm('Are you sure you want to remove this user from the organization?')) {
      // TODO: Call API to remove user
      console.log('Removing user:', userId, 'from org:', orgId);
    }
  };

  const handleUpdatePermissions = () => {
    if (editingUser && selectedOrgId) {
      // TODO: Call API to update permissions
      console.log('Updating permissions for user:', editingUser, 'in org:', selectedOrgId);
      setIsEditModalOpen(false);
      setEditingUser(null);
      setSelectedOrgId(null);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOrgId) {
      // TODO: Call API to add user to organization
      console.log('Adding user:', addUserEmail, 'to org:', selectedOrgId);
      setIsAddModalOpen(false);
      setAddUserEmail('');
      setSelectedOrgId(null);
    }
  };

  const toggleOrg = (orgId: number) => {
    setExpandedOrg(expandedOrg === orgId ? null : orgId);
  };

  const filteredOrgs = organizations.filter((org) =>
    org.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredMembers = (orgId: number) => {
    const members = orgMembers[orgId] || [];
    const query = memberSearchQuery[orgId] || '';
    if (!query) return members;
    return members.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.student_id.includes(query)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">My Organizations</h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-900">View your student organizations</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-2 sm:gap-4">
        <input
          type="text"
          placeholder="Search organizations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black"
        />
      </div>

      {/* Organizations List */}
      <div className="space-y-4">
        {filteredOrgs.map((org) => (
          <div key={org.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Organization Header */}
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleOrg(org.id)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {org.logo ? (
                    <img src={org.logo} alt={org.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl flex-shrink-0">
                      {org.name[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{org.name}</h3>
                    {org.description && (
                      <p className="text-sm text-gray-600 truncate">{org.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        Student Org
                      </span>
                      <span className="text-xs text-gray-500">
                        {org.member_count} members
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrgId(org.id);
                      setIsAddModalOpen(true);
                    }}
                    className="px-3 py-1.5 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 font-bold whitespace-nowrap"
                  >
                    + Add Member
                  </button>
                  <span className="text-2xl text-gray-500 transform transition-transform" style={{ transform: expandedOrg === org.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* Members List (Expandable) */}
            {expandedOrg === org.id && (
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                {/* Member Search */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={memberSearchQuery[org.id] || ''}
                    onChange={(e) => setMemberSearchQuery({...memberSearchQuery, [org.id]: e.target.value})}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black"
                  />
                </div>

                {/* Members Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                          Student ID
                        </th>
                        <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                          Permissions
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getFilteredMembers(org.id).map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-600">{user.email}</div>
                          </td>
                          <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.student_id}</div>
                          </td>
                          <td className="hidden lg:table-cell px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {user.can_post_events && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                  Post Events
                                </span>
                              )}
                              {user.can_add_members && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  Add Members
                                </span>
                              )}
                              {user.can_remove_members && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                  Remove Members
                                </span>
                              )}
                              {user.can_set_member_permissions && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                  Set Permissions
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditPermissions(user, org.id);
                              }}
                              className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer font-bold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveUser(user.id, org.id);
                              }}
                              className="text-red-600 hover:text-red-900 cursor-pointer font-bold"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Permissions Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Edit Permissions - {editingUser.name}
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingUser.can_post_events}
                    onChange={(e) => setEditingUser({...editingUser, can_post_events: e.target.checked})}
                    className="h-4 w-4 text-green-700 focus:ring-green-700 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Post Events</div>
                    <div className="text-xs text-gray-600">Can create and manage events</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingUser.can_add_members}
                    onChange={(e) => setEditingUser({...editingUser, can_add_members: e.target.checked})}
                    className="h-4 w-4 text-green-700 focus:ring-green-700 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Add Members</div>
                    <div className="text-xs text-gray-600">Can invite new members to the organization</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingUser.can_remove_members}
                    onChange={(e) => setEditingUser({...editingUser, can_remove_members: e.target.checked})}
                    className="h-4 w-4 text-green-700 focus:ring-green-700 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Remove Members</div>
                    <div className="text-xs text-gray-600">Can remove members from the organization</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingUser.can_set_member_permissions}
                    onChange={(e) => setEditingUser({...editingUser, can_set_member_permissions: e.target.checked})}
                    className="h-4 w-4 text-green-700 focus:ring-green-700 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Set Permissions</div>
                    <div className="text-xs text-gray-600">Can modify other members' permissions</div>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-4 border-t">
                <button
                  onClick={handleUpdatePermissions}
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-700 text-white rounded-lg hover:bg-green-800 font-bold cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingUser(null);
                    setSelectedOrgId(null);
                  }}
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-green-700 text-green-700 rounded-lg hover:bg-green-50 font-bold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Add Member
              </h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Student Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={addUserEmail}
                    onChange={(e) => setAddUserEmail(e.target.value)}
                    placeholder="student@usc.edu.ph"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the email of the student you want to add to this organization
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-700 text-white rounded-lg hover:bg-green-800 font-bold cursor-pointer"
                  >
                    Add Member
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setAddUserEmail('');
                      setSelectedOrgId(null);
                    }}
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
