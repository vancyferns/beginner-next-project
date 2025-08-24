const getPredictedAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io/?name=${name}`, { cache: "no-store" });
  return res.json();
};

const getPredictedGender = async (name: string) => {
  const res = await fetch(`https://api.genderize.io/?name=${name}`, { cache: "no-store" });
  return res.json();
};

const getPredictedCountry = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io/?name=${name}`, { cache: "no-store" });
  return res.json();
};

interface Params {
  params: Promise<{ name: string }>; // 👈 note: params is async
}

export default async function Page({ params }: Params) {
  const { name } = await params; // 👈 await params here

  const [age, gender, country] = await Promise.all([
    getPredictedAge(name),
    getPredictedGender(name),
    getPredictedCountry(name),
  ]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Personal Info for <span className="text-blue-600">{name}</span>
        </h1>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Age:</span>
            <span className="text-gray-900">{age?.age ?? "N/A"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Gender:</span>
            <span className="capitalize text-gray-900">{gender?.gender ?? "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Country:</span>
            <span className="text-gray-900">{country?.country?.[0]?.country_id ?? "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
