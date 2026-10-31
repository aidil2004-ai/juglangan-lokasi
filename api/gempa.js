export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  try {
    const response = await fetch(
      "https://data.bmkg.go.id/DataMKG/TEWS/gempadaterkini.json",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`BMKG Response status: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Gagal mengambil data dari BMKG",
        details: error.message,
      });
  }
}
