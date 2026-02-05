import React, { useRef, useState } from "react";
import { Rocket, CheckCircle2, ArrowRight } from "lucide-react";

import { jobApplicationAPI } from "../../services/jobApplicationAPI";

const BRAND = {
  accent: "#6EF1F7",
  primary: "#1353CD",
  secondary: "#007399",
};

const CareersForm = ({ variant = "card", jobTitle, jobType, jobLocation }) => {

  const formRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  const wrapperClass =
    variant === "modal"
      ? "w-full"
      : `
        bg-white/5 border border-white/10 rounded-3xl
        p-5 sm:p-7 md:p-10 lg:p-12
        shadow-2xl
      `;

  const inputBase =
    "w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 outline-none transition";
  const inputPad = "px-4 py-3 sm:px-5 sm:py-4";
  const labelPad = "p-5 sm:p-6";
  const focusRing =
    "focus:border-transparent focus:ring-2 focus:ring-[rgba(110,241,247,0.45)]";

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(`File size is ${(file.size / (1024 * 1024)).toFixed(2)}MB. Maximum allowed is 10MB.`);
        setResume(null);
        e.target.value = '';
      } else {
        setFileSizeError(null);
        setResume(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const file = formRef.current?.resume?.files?.[0];
    if (!file) return alert("Please upload your resume!");

    if (file.size > MAX_FILE_SIZE) {
      return alert(`File size is ${(file.size / (1024 * 1024)).toFixed(2)}MB. Maximum allowed is 10MB.`);
    }

    try {
      setLoading(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('fullName', formRef.current.fullName.value);
      formData.append('email', formRef.current.email.value);
      formData.append('phone', formRef.current.phone.value);
      formData.append('position', jobTitle || formRef.current.position?.value || 'Not specified');
      formData.append('experience', formRef.current.experience.value);
      formData.append('coverLetter', formRef.current.coverLetter?.value || '');
      formData.append('linkedInProfile', formRef.current.linkedInProfile?.value || '');
      formData.append('portfolio', formRef.current.portfolio?.value || '');
      formData.append('resume', file);

      // Submit to backend API
      const response = await jobApplicationAPI.submitApplication(formData);

      if (response.success) {
        setSubmitted(true);
        formRef.current.reset();
        setResume(null);



        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={wrapperClass}
      style={
        variant === "modal"
          ? undefined
          : { boxShadow: `0 25px 80px -60px ${BRAND.primary}` }
      }
    >
      {variant !== "modal" && (
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div
            className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: BRAND.accent }}
          >
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Apply Now
            </h2>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Let's start your journey
            </p>
          </div>
        </div>
      )}

      {/* ✅ Wrap everything in a form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
      >
        {/* hidden time param for template */}
        <input type="hidden" name="time" value="" />
        <input type="hidden" name="jobTitle" value={jobTitle || ""} />
        <input type="hidden" name="jobType" value={jobType || ""} />
        <input type="hidden" name="jobLocation" value={jobLocation || ""} />



        <input
          name="fullName"
          required
          placeholder="Full Name"
          className={`${inputBase} ${inputPad} ${focusRing}`}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = `${BRAND.accent}99`)
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
          }
        />

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className={`${inputBase} ${inputPad} ${focusRing}`}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = `${BRAND.accent}99`)
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
          }
        />

        <input
          name="phone"
          placeholder="Phone"
          className={`${inputBase} ${inputPad} ${focusRing}`}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = `${BRAND.accent}99`)
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
          }
        />


        <input
          name="experience"
          placeholder="Experience (e.g., 2 years)"
          className={`${inputBase} ${inputPad} ${focusRing}`}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = `${BRAND.accent}99`)
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
          }
        />

        <input
          name="linkedInProfile"
          type="url"
          placeholder="LinkedIn Profile (optional)"
          className={`${inputBase} ${inputPad} ${focusRing}`}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = `${BRAND.accent}99`)
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
          }
        />

        <input
          name="portfolio"
          type="url"
          placeholder="Portfolio URL (optional)"
          className={`${inputBase} ${inputPad} ${focusRing}`}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = `${BRAND.accent}99`)
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
          }
        />

        {/* Resume upload (full width) */}
        <label
          className={`md:col-span-2 block border border-dashed rounded-xl ${labelPad} text-center cursor-pointer text-white/70 hover:bg-white/5 transition ${fileSizeError ? 'border-red-500/50' : ''}`}
          style={{ borderColor: fileSizeError ? '#ef44441a' : `${BRAND.accent}55` }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <span className="font-medium">
              {resume ? resume.name : "Click to upload resume"}
            </span>
            {!resume && (
              <span className="text-xs text-white/45">
                (PDF/DOC, max 10MB)
              </span>
            )}
          </div>

          {/* ✅ IMPORTANT: name="resume" for EmailJS attachment */}
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            hidden
            required
          />
        </label>

        {/* File size error message */}
        {fileSizeError && (
          <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
            ⚠️ {fileSizeError}
          </div>
        )}

        {/* Cover letter (full width) */}
        <textarea
          name="coverLetter"
          placeholder="Cover Letter (optional)"
          rows={4}
          className={`${inputBase} ${inputPad} ${focusRing} md:col-span-2 resize-y`}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = `${BRAND.accent}99`)
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
          }
        />

        {/* ✅ Button should be type="submit" */}
        <button
          type="submit"
          disabled={loading || fileSizeError !== null}
          className="
            md:col-span-2
            w-full py-3.5 sm:py-4
            rounded-xl
            flex justify-center items-center gap-2
            font-semibold
            transition
            active:scale-[0.99]
            disabled:opacity-60 disabled:cursor-not-allowed
          "
          style={{
            backgroundColor: submitted ? "#22c55e" : BRAND.accent,
            color: submitted ? "#fff" : "#000",
          }}
        >
          {loading ? (
            "Submitting..."
          ) : submitted ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Submitted
            </>
          ) : (
            <>
              Submit <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CareersForm;
