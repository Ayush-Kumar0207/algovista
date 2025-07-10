// src/pages/Versions.tsx
"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Calendar, Code, FileDiff, Loader2, Search, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
// import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useAuth } from "../context/AuthContext";

type Version = {
    _id: string;
    projectTitle: string;
    language: string;
    timestamp: string;
    content: string;
    note?: string;
};

const Versions = () => {
    const { user, loading: authLoading } = useAuth();
    const [versions, setVersions] = useState<Version[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchVersions = async () => {
            try {
                const res = await api.get<Version[]>(`/user/${user._id}/versions`); // Adjust based on backend route
                setVersions(res.data);
            } catch (err) {
                console.error("Error fetching versions:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVersions();
    }, []);

    const filteredVersions = versions.filter((v) =>
        v.projectTitle.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-100 p-6">
            {/* 🔙 Header */}
            <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => navigate("/")}>
                        <ArrowLeft className="mr-1" size={18} /> Back
                    </Button>
                    <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
                        <FileDiff size={26} /> Version Control
                    </h1>
                </div>
                <div className="w-80 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <Input
                        className="pl-10"
                        placeholder="Search by project title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* 🧾 Content */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center items-center">
                        <Loader2 className="animate-spin text-gray-500 mr-2" />
                        Loading versions...
                    </div>
                ) : filteredVersions.length === 0 ? (
                    <p className="col-span-full text-gray-600 text-center italic">
                        No versions found for the current filter.
                    </p>
                ) : (
                    filteredVersions.map((v) => (
                        <Card key={v._id} className="bg-white border shadow-sm hover:shadow-md transition duration-200">
                            <CardHeader className="pb-0">
                                <h3 className="text-lg font-semibold text-indigo-700">{v.projectTitle}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <Calendar size={14} /> {dayjs(v.timestamp).format("MMM D, YYYY h:mm A")}
                                </p>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <p className="text-sm text-gray-700 flex items-center gap-1">
                                    <Code size={14} /> <span className="capitalize">{v.language}</span>
                                </p>
                                {v.note && (
                                    <p className="text-sm text-gray-600 italic">
                                        📝 {v.note.length > 80 ? v.note.slice(0, 80) + "..." : v.note}
                                    </p>
                                )}

                                <div className="flex justify-between mt-4 gap-2">
                                    <Button
                                        variant="default"
                                        onClick={() => navigate(`/editor/${v._id}`)}
                                    >
                                        <BookOpen size={16} className="mr-1" /> Open
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => console.log("Restore logic here")}
                                    >
                                        <Undo2 size={16} className="mr-1" /> Restore
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Versions;
