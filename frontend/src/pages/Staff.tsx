import React, { useEffect, useState } from 'react';
import Drawer from '../components/Drawer';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  contact: string;
}

function Staff() {
  const [staffs, setStaffs] = useState<StaffMember[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    contact: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/staff')
      .then((res) => res.json())
      .then((data) => setStaffs(data))
      .catch((error) => console.error('Error fetching staff:', error));
  }, []);

  const openDrawer = () => {
    setFormData({
      name: '',
      role: '',
      contact: '',
    });
    setFormError(null);
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);
    try {
      const response = await fetch('http://localhost:5000/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add staff member');
      }
      const newStaff = await response.json();
      setStaffs((prev) => [...prev, newStaff]);
      closeDrawer();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('An unknown error occurred');
      }
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staff</h1>
        <button
          onClick={openDrawer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Staff
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Role</th>
            <th className="py-2 px-4 border-b border-gray-200">Contact</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff) => (
            <tr key={staff.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{staff.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{staff.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{staff.role}</td>
              <td className="py-2 px-4 border-b border-gray-200">{staff.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} title="Add Staff">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter staff name"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter role"
              required
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter contact info"
              required
            />
          </div>
          {formError && <div className="text-red-600">{formError}</div>}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={formLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {formLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

export default Staff;
