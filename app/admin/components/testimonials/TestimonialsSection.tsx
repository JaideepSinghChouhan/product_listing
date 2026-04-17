"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { api } from "@/lib/api";

import TestimonialsTable from "./TestimonialsTable";
import TestimonialForm from "./TestimonialForm";

export default function TestimonialsSection() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchTestimonials = async () => {
    const res = await api("/testimonials");
    setData(res);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
        <h2 className="font-playfair text-xl">Testimonials</h2>

        <button
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 py-2 bg-accent text-white rounded active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <TestimonialsTable data={data} refresh={fetchTestimonials} />

      <TestimonialForm open={open} onClose={() => setOpen(false)} refresh={fetchTestimonials} />

    </div>
  );
}