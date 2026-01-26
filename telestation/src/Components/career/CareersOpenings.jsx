// src/components/careers/CareersOpenings.jsx
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Loader } from "lucide-react";
import CareersForm from "./CareerFrom";
import { jobPostingAPI } from "../../services/jobPostingAPI";

const COMPANY_LOCATION = "Calicut, Kerala";

// ✅ BRAND COLORS
const BRAND = {
  cyan: "#6EF1F7",
  blue: "#007399",
};

function JobCard({ job, onApply }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className="
        group relative overflow-hidden rounded-2xl
        border border-white/10
        bg-gradient-to-br from-white/[0.06] to-white/[0.02]
        p-6 sm:p-7 md:p-8
        shadow-[0_25px_90px_-60px_rgba(0,0,0,0.65)]
        backdrop-blur-sm
        text-center
      "
    >
      {/* ✅ brand glows */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-35"
        style={{
          background: `radial-gradient(circle, ${BRAND.cyan}40, transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full blur-3xl opacity-25"
        style={{
          background: `radial-gradient(circle, ${BRAND.blue}35, transparent 65%)`,
        }}
      />

      {/* ✅ centered content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* type pill */}
        <span
          className="mb-4 rounded-full border px-3 py-1 text-xs sm:text-sm font-semibold backdrop-blur"
          style={{
            borderColor: `${BRAND.cyan}55`,
            color: BRAND.cyan,
            backgroundColor: "rgba(0,0,0,0.35)",
          }}
        >
          {job.type}
        </span>

        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white leading-tight">
          {job.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm md:text-base text-white/60">
          {job.location}
        </p>

        {/* button */}
        <button
          onClick={onApply}
          className="
            mt-6
            w-full sm:w-auto
            inline-flex items-center justify-center gap-3
            rounded-xl border
            px-7 sm:px-10
            py-3 sm:py-3.5
            text-sm sm:text-base font-semibold
            transition-all duration-200
            active:scale-[0.99]
          "
          style={{
            borderColor: `${BRAND.cyan}55`,
            color: BRAND.cyan,
            background:
              "linear-gradient(90deg, rgba(110,241,247,0.10), rgba(0,115,153,0.06))",
          }}
        >
          Apply
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

function ModalShell({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Center wrapper */}
          <motion.div
            className="fixed inset-0 z-[9999] overflow-y-auto p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <div className="min-h-full flex items-start justify-center">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 22, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 22, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="
                w-full max-w-[980px]
                rounded-2xl sm:rounded-3xl
                border border-white/10 bg-black
                shadow-2xl overflow-hidden
               my-6
              "
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-white/10">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-white/55">
                    Career Application
                  </p>
                  <h4 className="text-lg sm:text-2xl font-bold text-white truncate">
                    {title}
                  </h4>
                </div>

                <button
                  onClick={onClose}
                  className="
                    inline-flex h-10 w-10 sm:h-11 sm:w-11
                    items-center justify-center
                    rounded-xl
                    border border-white/15
                    bg-white/5 text-white
                    hover:bg-white/10
                  "
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">{children}</div>
              
            </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function CareersOpenings() {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job postings on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobPostingAPI.getAllPostings();
        if (response.success) {
          setJobs(response.data);
        } else {
          setError('Failed to load job postings');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Error loading job postings');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const modalTitle = useMemo(() => {
    if (!selectedJob) return "Apply Now";
    return `Apply for ${selectedJob.title}`;
  }, [selectedJob]);

  const handleApply = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  return (
    <section id="openings" className="bg-black py-10 sm:py-12 md:py-16">
      <div className="mx-auto w-[min(1100px,92vw)] px-4 sm:px-0">
        {/* ✅ CENTERED HEADING */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Open Positions
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
            Explore our current openings and apply in a minute.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
              <p className="text-white/60">Loading positions...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex justify-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && jobs.length === 0 && (
          <div className="flex justify-center py-20">
            <p className="text-white/60">No open positions at the moment. Please check back soon!</p>
          </div>
        )}

        {/* ✅ grid stays responsive */}
        {!loading && jobs.length > 0 && (
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} onApply={() => handleApply(job)} />
            ))}
          </div>
        )}

        <ModalShell open={open} onClose={close} title={modalTitle}>
          {selectedJob && (
            <div className="mb-4 sm:mb-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-white font-semibold">{selectedJob.title}</p>
                <span className="w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                  {selectedJob.type}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-white/60">
                {selectedJob.location}
              </p>
            </div>
          )}

          <CareersForm
            variant="modal"
            jobTitle={selectedJob?.title}
            jobType={selectedJob?.type}
            jobLocation={selectedJob?.location}
            jobId={selectedJob?._id}
          />
        </ModalShell>
      </div>
    </section>
  );
}
