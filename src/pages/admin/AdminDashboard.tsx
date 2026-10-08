import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="pt-24 pb-20 text-center flex justify-center items-center flex-col gap-6">
            <h1 className="text-3xl font-semibold mb-8">Welcome Admin</h1>

            <div className="flex flex-col gap-4 justify-center items-center">
                <Link
                    to="/admin/blogs"
                    className="px-5 py-2 bg-blue-600 text-white rounded"
                >
                    Manage Blogs
                </Link>

                <Link
                    to="/admin/create-blog"
                    className="px-5 py-2 bg-green-600 text-white rounded"
                >
                    Create New Blog
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
