import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from "../lib/validations/userSchema";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { editUser } from "../redux/userSlice";
import { toast } from 'react-toastify';


export default function EditUser() {
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.user)
    const user = users.data?.find((user) => user.id === Number(id));
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            address: {
                street: user?.address.street,
                suite: user?.address.suite,
                city: user?.address.city,
                zipcode: user?.address.zipcode,
                geo: {
                    lat: user?.address.geo.lat,
                    lng: user?.address.geo.lng,
                }
            },
            company: {
                name: user?.company.name,
                catchPhrase: user?.company.catchPhrase,
                bs: user?.company.bs,
            }
        }
    });

    const onSubmit = (data: z.infer<typeof userSchema>) => {
        dispatch(editUser({ id: Number(id), ...data }));
        toast.success('User berhasil diubah', {
            theme: 'colored'
        });
        navigate('/');
    }


    useEffect(() => {
        users.data === null && navigate('/');
    }, []);


    return (
        <div className="p-4 lg:p-10 flex flex-col items-center">
            <div className="flex justify-between w-full lg:w-1/2 items-center bg-gray-100 p-6 rounded-2xl">
                <Link to="/" className="bg-gray-500 text-white p-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    <ArrowLeft size={18} />
                </Link>
                <h1 className="text-2xl font-semibold text-center">Edit User {id}</h1>
                <div></div>
            </div>
            <div className="w-full lg:w-1/2 p-6 bg-white shadow-xl rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="gap-6 grid grid-cols-2 ">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            {...register("name")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...register("email")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Street */}
                    <div className="col-span-2 flex items-center gap-4">
                        <div className="flex-1 h-0.5 bg-gray-300/50"></div>
                        <h1 className="text-lg font-semibold text-gray-300">Address</h1>
                        <div className="flex-1 h-0.5 bg-gray-300/50"></div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Street</label>
                        <input
                            {...register("address.street")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address?.street && <p className="text-red-500 text-sm">{errors.address.street.message}</p>}
                    </div>

                    {/* Suite */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Suite</label>
                        <input
                            {...register("address.suite")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address?.suite && <p className="text-red-500 text-sm">{errors.address.suite.message}</p>}
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            {...register("address.city")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address?.city && <p className="text-red-500 text-sm">{errors.address.city.message}</p>}
                    </div>

                    {/* Zipcode */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Zipcode</label>
                        <input
                            {...register("address.zipcode")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address?.zipcode && <p className="text-red-500 text-sm">{errors.address.zipcode.message}</p>}
                    </div>

                    {/* Lat */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Latitude</label>
                        <input
                            {...register("address.geo.lat")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address?.geo?.lat && <p className="text-red-500 text-sm">{errors.address.geo.lat.message}</p>}
                    </div>

                    {/* Long */}
                    <div className="space-y-2" >
                        <label className="block text-sm font-medium text-gray-700">Longitude</label>
                        <input
                            {...register("address.geo.lng")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address?.geo?.lng && <p className="text-red-500 text-sm">{errors.address.geo.lng.message}</p>}
                    </div>

                    {/* Company */}
                    <div className="col-span-2 flex items-center gap-4">
                        <div className="flex-1 h-0.5 bg-gray-300/50"></div>
                        <h1 className="text-lg font-semibold text-gray-300">Company</h1>
                        <div className="flex-1 h-0.5 bg-gray-300/50"></div>
                    </div>

                    {/* Company name */}
                    <div className="space-y-2 col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Company name</label>
                        <input
                            {...register("company.name")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.company?.name && <p className="text-red-500 text-sm">{errors.company?.name.message}</p>}
                    </div>

                    {/* Catch phrase */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Catch phrase</label>
                        <input
                            {...register("company.catchPhrase")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.company?.catchPhrase && <p className="text-red-500 text-sm">{errors.company?.catchPhrase.message}</p>}
                    </div>

                    {/* Bs */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Bs</label>
                        <input
                            {...register("company.bs")}
                            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.company?.bs && <p className="text-red-500 text-sm">{errors.company?.bs.message}</p>}
                    </div>

                    <div className="flex justify-end col-span-2 gap-2">
                        <button
                            onClick={() => reset()}
                            type="button"
                            className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
