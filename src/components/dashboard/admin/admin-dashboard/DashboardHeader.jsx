export const DashboardHeader = ({ userName }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="w-full rounded-xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-gray-800">
          Selamat datang, <span className="text-cyan-600">{userName}</span> 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Berikut ringkasan aktivitas terbaru di sistem hari ini.
        </p>
      </div>
    </div>
  );
};
