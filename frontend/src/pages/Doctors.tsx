import React, { useEffect, useState } from 'react';
import Drawer from '../components/Drawer';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/doctors')
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  const openDrawer = () => {
    setFormData({
      name: '',
      specialization: '',
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
      const response = await fetch('http://localhost:5000/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add doctor');
      }
      const newDoctor = await response.json();
      setDoctors((prev) => [...prev, newDoctor]);
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
        <h1 className="text-3xl font-bold">Doctors</h1>
        <button
          onClick={openDrawer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Doctor
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Doctor ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Specialization</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{doctor.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{doctor.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{doctor.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} title="Add Doctor">
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
              placeholder="Enter doctor name"
              required
            />
          </div>
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter specialization"
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

export default Doctors;
