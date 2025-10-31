import React, { useEffect, useState } from 'react';
import { Users, Calendar, CreditCard, Building2 } from 'lucide-react';
import Drawer from '../components/Drawer';

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    revenueThisMonth: 0,
    availableRooms: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Fetch total patients
    fetch('http://localhost:5000/dashboard/patients/count')
      .then((res) => res.json())
      .then((data) => setStats((prev) => ({ ...prev, totalPatients: data.count })))
      .catch((error) => console.error('Error fetching total patients:', error));

    // Fetch appointments today
    fetch('http://localhost:5000/dashboard/appointments/today/count')
      .then((res) => res.json())
      .then((data) => setStats((prev) => ({ ...prev, appointmentsToday: data.count })))
      .catch((error) => console.error('Error fetching appointments today:', error));

    // Fetch revenue this month
    fetch('http://localhost:5000/dashboard/billings/revenue/month')
      .then((res) => res.json())
      .then((data) => setStats((prev) => ({ ...prev, revenueThisMonth: data.revenue })))
      .catch((error) => console.error('Error fetching revenue this month:', error));

    // Fetch available rooms
    fetch('http://localhost:5000/dashboard/rooms/available/count')
      .then((res) => res.json())
      .then((data) => setStats((prev) => ({ ...prev, availableRooms: data.count })))
      .catch((error) => console.error('Error fetching available rooms:', error));

    // Fetch recent appointments
    fetch('http://localhost:5000/dashboard/appointments/recent')
      .then((res) => res.json())
      .then((data) => setRecentAppointments(data))
      .catch((error) => console.error('Error fetching recent appointments:', error));

    // Fetch available doctors
    fetch('http://localhost:5000/dashboard/doctors/available')
      .then((res) => res.json())
      .then((data) => setAvailableDoctors(data))
      .catch((error) => console.error('Error fetching available doctors:', error));
  }, []);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const statItems = [
    { label: 'Total Patients', value: stats.totalPatients.toLocaleString(), icon: Users, color: 'bg-blue-500' },
    { label: 'Appointments Today', value: stats.appointmentsToday.toLocaleString(), icon: Calendar, color: 'bg-green-500' },
    { label: 'Revenue This Month', value: `$${stats.revenueThisMonth.toLocaleString()}`, icon: CreditCard, color: 'bg-purple-500' },
    { label: 'Available Rooms', value: stats.availableRooms.toLocaleString(), icon: Building2, color: 'bg-yellow-500' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={openDrawer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Data
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statItems.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className={`inline-flex p-3 rounded-lg ${stat.color} text-white mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{stat.value}</h2>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
          <div className="space-y-4">
            {recentAppointments.length === 0 ? (
              <p className="text-gray-600">No recent appointments</p>
            ) : (
              recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-gray-600">Dr. {appointment.doctorName} • {appointment.doctorSpecialization}</p>
                  </div>
                  <span className="text-sm text-gray-600">{appointment.time}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Available Doctors</h2>
          <div className="space-y-4">
            {availableDoctors.length === 0 ? (
              <p className="text-gray-600">No available doctors</p>
            ) : (
              availableDoctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <img
                    src={doctor.photoUrl || `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop`}
                    alt={`Dr. ${doctor.name}`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium">Dr. {doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} title="Add Data">
        <form className="space-y-4">
          <div>
            <label htmlFor="dataField1" className="block text-sm font-medium text-gray-700">
              Data Field 1
            </label>
            <input
              type="text"
              id="dataField1"
              name="dataField1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter data field 1"
            />
          </div>
          <div>
            <label htmlFor="dataField2" className="block text-sm font-medium text-gray-700">
              Data Field 2
            </label>
            <input
              type="text"
              id="dataField2"
              name="dataField2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter data field 2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

export default Dashboard;
