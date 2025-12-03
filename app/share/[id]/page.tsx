import ky from "ky";
import type { interfaceShareResult } from "@/types/horoscope";

export default async function SharePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const data: interfaceShareResult = await ky.get(`/api/horoscope/${id}`).json();
  console.log("data: ", data);

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">

        <h1 className="text-2xl font-bold text-center">🔮 ຜົນທຳນາຍດວງຊະຕາຂອງທ່ານ!!</h1>

        <div className="bg-[#1F1F2E] p-5 rounded-2xl shadow-lg border border-purple-500/20 whitespace-pre-line">
          {data?.content}
        </div>

        <p className="text-center text-sm opacity-60">
          ແຊໂດຍ Horoscope App
        </p>
      </div>
    </div>
  );
}
