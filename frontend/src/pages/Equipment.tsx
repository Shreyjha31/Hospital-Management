import React, { useEffect, useState } from 'react';
import Drawer from '../components/Drawer';

interface Equipment {
  id: number;
  name: string;
  quantity: number;
  status: string;
}

function Equipment() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    status: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/equipments')
      .then((res) => res.json())
      .then((data) => setEquipments(data))
      .catch((error) => console.error('Error fetching equipments:', error));
  }, []);

  const openDrawer = () => {
    setFormData({
      name: '',
      quantity: '',
      status: '',
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
      const response = await fetch('http://localhost:5000/equipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add equipment');
      }
      const newEquipment = await response.json();
      setEquipments((prev) => [...prev, newEquipment]);
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
        <h1 className="text-3xl font-bold">Equipment</h1>
        <button
          onClick={openDrawer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Equipment
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Equipment ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Quantity</th>
            <th className="py-2 px-4 border-b border-gray-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{equipment.id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{equipment.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{equipment.quantity}</td>
              <td className="py-2 px-4 border-b border-gray-200">{equipment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} title="Add Equipment">
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
              placeholder="Enter equipment name"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter equipment quantity"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter equipment status"
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

export default Equipment;
