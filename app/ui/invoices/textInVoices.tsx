import axios from "axios";

export default async function TextInVoices() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = await axios.get("http://localhost:6969/api/v1/companies?currentPage=1&limit=10");
    const data = result.data.data.result;
    return (
        <div>
            {data.map((item: any) => {
                return <p>{item.name}</p>;
            })}
        </div>
    );
}
