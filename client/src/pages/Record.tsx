import Delete from '@mui/icons-material/Delete';
import Info from '@mui/icons-material/Info';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactEcharts from "echarts-for-react"; 
interface Record {
    _id: string | undefined,
    created_at: string | undefined,
    initial_height: number,
    final_height: number,
}
export default function RecordPage() {
    const [addedRecord, setAddedRecord] = useState<Record>({
        initial_height: 0,
        final_height: 0,
    } as Record)
    const [defaultInitialHeight, setDefaultInitialHeight] = useState(40.0)
    const [data, setData] = useState<Record[]>([])
    const [showAddDataModal, setShowAddDataModal] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState(false)
    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + '/record')
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    
    }, [])


    return (
        <div className='min-h-screen w-screen  flex'>
            {/* Add Record Modal */}
            {showAddDataModal && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'>
                    <div className='bg-white text-black rounded-md p-8 flex flex-col'>
                        <div className='flex justify-between'>
                            <div className='text-2xl font-bold'>Setting</div>
                            
                        </div>
                        <div className='flex flex-col my-4'>
                            <label>Default Initial Height</label>
                            <input type='number' className='bg-white outline outline-1 rounded-sm'
                            defaultValue={defaultInitialHeight}
                            onChange={
                                (e) => {
                                    setDefaultInitialHeight(parseFloat(e.target.value))
                                    console.log(e.target.value)
                                }
                            }
                            ></input>
                        </div>
                        <div className='flex justify-end'>
                            <button className='bg-primary text-white font-bold py-2 px-4 mr-2 rounded'
                            onClick={() => {
                                axios.post(import.meta.env.VITE_BACKEND_URL + '/initial_height?initial_height=' + defaultInitialHeight)
                                .then((res) => {
                                    console.log(res.data)
                                    //Refresh page
                                    //window.location.reload();
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                            }}>
                                Set
                            </button>
                            <button onClick={() => setShowAddDataModal(false)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Info Modal showing Diagram of Initial vs Final Volume*/}
            {showInfoModal && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'>
                    <div className='bg-white text-black rounded-md p-8 flex flex-col'>
                        <div className='flex justify-between'>
                            <div className='text-2xl font-bold text-center mx-auto'>Info</div>
                            
                        </div>
                        <div className='flex flex-col my-4 w-72'>
                            <ReactEcharts
                                option={{
                                    title: {
                                        text: 'Initial vs Final Volume',
                                        left: 'center'
                                    },
                                    tooltip: {
                                        trigger: 'axis'
                                    },
                                    xAxis: {
                                        type: 'category',
                                        data: ["Initial Volume", "Final Volume"]
                                    },
                                    yAxis: {
                                        type: 'value',
                                        name: 'Volume (L)'
                                    },
                                    series: [{
                                        data: [(addedRecord.initial_height *50*30/1000), (addedRecord.final_height *50*30/1000)],
                                        type: 'bar'
                                    }]
                                }}
                            />
                            {/*Time, Initial Height, Final Height, Initial Volume, Final Volume*/}
                            <p className='text-center'>Date: {new Date(addedRecord.created_at as string + "Z").toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'}).replace("pukul","-")}</p>
                            <p className='text-center'>Initial Height: {Math.round(addedRecord.initial_height*100)/100} cm</p>
                            <p className='text-center'>Final Height: {Math.round(addedRecord.final_height*100)/100} cm</p>
                            <p className='text-center'>Initial Volume: {Math.round(addedRecord.initial_height *50*30/1000 *100)/100} L</p>
                            <p className='text-center'>Final Volume: {Math.round(addedRecord.final_height *50*30/1000 *100)/100} L</p>
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={() => setShowInfoModal(false)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
            {/* Horizontal Navbar*/}
            {/*
            <div className='text-center bg-primary flex flex-col h-full min-h-screen justify-between py-16 items-center w-1/4'>
                <div className='items-center'>
                    <div className='text-white font-bold my-6 text-2xl'>Trash Compactor</div>
                </div>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                    Logout
                </button>
                <div></div>
            </div>
            */}
            <div className='mx-auto my-auto flex-col flex w-full'>
                <h1 className='text-4xl font-bold text-center my-8 text-primary'>Trash Compactor</h1>
                <div className=' w-3/4 mx-auto max-w-6xl'>
                    <div className=' w-full flex justify-end'>
                        <button className='bg-primary self-end text-white font-bold py-2 px-4 rounded' onClick={() => {
                            setShowAddDataModal(true)
                            }}>
                            Setting
                        </button>
                    </div>
                    <table className='text-black text-center rounded-md w-full'>
                        <thead>
                            <tr className=" bg-primary outline outline-1 outline-gray-200 text-white">
                                <th>No</th>
                                <th>Time</th>
                                <th>Initial Height (cm)</th>
                                <th>Final Height (cm)</th>
                                <th className='max-sm:hidden'>Initial Volume (L)</th>
                                <th className='max-sm:hidden'>Final Volume (L)</th>
                                <th className='max-sm:hidden'>Volume Change (L)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item,index) => {
                                return (
                                    <tr key={item._id} className=" bg-secondary outline outline-1 text-center outline-gray-200">
                                        <td>{index+1}</td>
                                        {/* Convert item.created_at which is UTC Time String to  Local Time with format DD Month (non abbreviated) Year HH:mm:ss*/}
                                        <td>{new Date(item.created_at as string + "Z").toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'}).replace("pukul","-")}</td>
                                        <td>{Math.round(item.initial_height*100)/100}</td>
                                        <td>{Math.round(item.final_height*100)/100}</td>
                                        <td className='max-sm:hidden'>{Math.round(item.initial_height *50*30/1000 *100)/100}</td>
                                        <td className='max-sm:hidden'>{Math.round(item.final_height*50*30/1000*100)/100}</td>
                                        <td className='max-sm:hidden'>{Math.round((item.initial_height - item.final_height)*30*50/1000*100)/100}</td>
                                        <td>
                                        <button 
                                            onClick={() => {
                                                setAddedRecord(item)
                                                console.log(addedRecord)
                                                setShowInfoModal(true)
                                            }}
                                            className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-1 transition-all aspect-square mx-2 rounded'>
                                                <Info fontSize='small' />
                                            </button>

                                            <button 
                                            onClick={() => {
                                                axios.delete(import.meta.env.VITE_BACKEND_URL + '/record/' + item._id)
                                                .then((_) => {
                                                    //Refresh page
                                                    window.location.reload();
                                                })
                                                .catch((err) => {
                                                    console.log(err)
                                                })
                                            
                                            }}
                                            className='bg-red-500 hover:bg-red-700 text-white font-bold px-1 transition-all aspect-square mx-2 rounded'>
                                                <Delete fontSize='small' />
                                            </button>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}