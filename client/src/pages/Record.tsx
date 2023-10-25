import Delete from '@mui/icons-material/Delete';
import Info from '@mui/icons-material/Info';
export default function RecordPage() {
    const dummyData = [
        {
            "id": 1,
            "Device": "Device 1",
            "Time": "2021-09-01T00:00:00.000Z",
            "Height": 1.8,
            "Volume": 1.8,
        }
    ]

    return (
        <div className=' min-h-screen w-screen flex-col flex'>
            <div className='mx-auto my-auto w-9/12'>
            <div className=' flex justify-end'>
            <button className='bg-primary self-end text-white font-bold py-2 px-4 rounded'>
                Add Device
            </button>
            </div>
            <table className='text-black text-center rounded-md w-full'>
                <thead>
                    <tr className=" bg-primary outline outline-1 outline-gray-200 text-white">
                        <th>ID</th>
                        <th>Device</th>
                        <th>Time</th>
                        <th>Height</th>
                        <th>Volume</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map((data) => {
                        return (
                            <tr key={data.id} className=" bg-secondary outline outline-1 text-center outline-gray-200">
                                <td>{data.id}</td>
                                <td>{data.Device}</td>
                                <td>{data.Time}</td>
                                <td>{data.Height}</td>
                                <td>{data.Volume}</td>
                                <td>
                                    <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-1 transition-all aspect-square mx-2 rounded'>
                                        <Info fontSize='small'/>
                                    </button>
                                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold px-1 transition-all aspect-square mx-2 rounded'>
                                        <Delete fontSize='small'/>
                                    </button>
                                    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    )
}