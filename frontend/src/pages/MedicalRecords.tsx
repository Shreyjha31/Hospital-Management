import React, { useEffect, useState } from 'react';
import Drawer from '../components/Drawer';

interface MedicalRecord {
  id: number;
  patientId: number;
  description: string;
  date: string;
}

function MedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    description: '',
    date: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/medicalrecords')
      .then((res) => res.json())
      .then((data) => setMedicalRecords(data))
      .catch((error) => console.error('Error fetching medical records:', error));
  }, []);

  const openDrawer = () => {
    setFormData({
      patientId: '',
      description: '',
      date: '',
    });
    setFormError(null);
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch('http://localhost:5000/medicalrecords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          patientId: Number(formData.patientId),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add medical record');
      }
      const newRecord = await response.json();
      setMedicalRecords((prev) => [...prev, newRecord]);
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
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <button
          onClick={openDrawer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Record
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Record ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Patient ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Description</th>
            <th className="py-2 px-4 border-b border-gray-200">Date</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords.map((record) => (
            <tr key={record.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{record.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{record.patientId}</td>
              <td className="py-2 px-4 border-b border-gray-200">{record.description}</td>
              <td className="py-2 px-4 border-b border-gray-200">{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} title="Add Medical Record">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
              Patient ID
            </label>
            <input
              type="number"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter patient ID"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter description"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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

export default MedicalRecords;
