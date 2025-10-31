import React, { useEffect, useState } from 'react';
import Drawer from '../components/Drawer';

interface Medication {
  id: number;
  patientId: number;
  name: string;
  dosage: string;
  startDate: string;
  endDate: string;
}

function Medications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    name: '',
    dosage: '',
    startDate: '',
    endDate: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/medications')
      .then((res) => res.json())
      .then((data) => setMedications(data))
      .catch((error) => console.error('Error fetching medications:', error));
  }, []);

  const openDrawer = () => {
    setFormData({
      patientId: '',
      name: '',
      dosage: '',
      startDate: '',
      endDate: '',
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
      const response = await fetch('http://localhost:5000/medications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          patientId: Number(formData.patientId),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add medication');
      }
      const newMedication = await response.json();
      setMedications((prev) => [...prev, newMedication]);
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
        <h1 className="text-3xl font-bold">Medications</h1>
        <button
          onClick={openDrawer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Medication
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Medication ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Patient ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Dosage</th>
            <th className="py-2 px-4 border-b border-gray-200">Start Date</th>
            <th className="py-2 px-4 border-b border-gray-200">End Date</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{medication.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{medication.patientId}</td>
              <td className="py-2 px-4 border-b border-gray-200">{medication.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{medication.dosage}</td>
              <td className="py-2 px-4 border-b border-gray-200">{medication.startDate}</td>
              <td className="py-2 px-4 border-b border-gray-200">{medication.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} title="Add Medication">
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
              placeholder="Enter medication name"
              required
            />
          </div>
          <div>
            <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">
              Dosage
            </label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={formData.dosage}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter dosage"
              required
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
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

export default Medications;
