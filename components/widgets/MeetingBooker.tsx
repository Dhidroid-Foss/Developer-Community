"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, X, Check } from "lucide-react";

// ── Static config ─────────────────────────────────────────────────────────────
const DATES = ["Jul 15 (Mon)", "Jul 16 (Tue)", "Jul 17 (Wed)", "Jul 18 (Thu)", "Jul 19 (Fri)"];
const TIMES = ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"];

interface MeetingBookerProps {
  /** Whether the panel is open */
  isOpen: boolean;
  /** Callback to close the panel */
  onClose: () => void;
}

/**
 * MeetingBooker — floating architecture session booking panel.
 *
 * Saves booking to localStorage and renders a ticket confirmation on success.
 */
export function MeetingBooker({ isOpen, onClose }: MeetingBookerProps) {
  const [sessionType, setSessionType]       = useState("");
  const [selectedDate, setSelectedDate]     = useState("");
  const [selectedTime, setSelectedTime]     = useState("");
  const [meetName, setMeetName]             = useState("");
  const [meetEmail, setMeetEmail]           = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId]           = useState("");

  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionType || !selectedDate || !selectedTime || !meetName || !meetEmail) return;

    const id = `MEET-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = { id, sessionType, date: selectedDate, time: selectedTime, name: meetName, email: meetEmail };

    const existing = JSON.parse(localStorage.getItem("devsync_bookings") || "[]");
    localStorage.setItem("devsync_bookings", JSON.stringify([...existing, newBooking]));

    setBookingId(id);
    setBookingConfirmed(true);
  };

  const reset = () => {
    setSessionType(""); setSelectedDate(""); setSelectedTime("");
    setMeetName(""); setMeetEmail("");
    setBookingConfirmed(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="fixed bottom-24 right-6 z-50 w-[min(410px,calc(100vw-32px))] max-h-[580px] overflow-y-auto border border-[#cfcac0] bg-[#eeeae2] shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-zinc-950 text-white p-4 border-b border-[#cfcac0]">
        <div className="flex items-center gap-2">
          <span className="text-[#fa6739]">✦</span>
          <span className="font-mono text-xs uppercase tracking-widest font-bold">Book Architecture Session</span>
        </div>
        <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 bg-stone-50/50">
        {bookingConfirmed ? (
          /* Success state */
          <div className="text-center py-6 flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-[#fa6739]/10 text-[#fa6739] flex items-center justify-center mb-4">
              <Check size={24} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-950">Session Booked!</h3>
            <div className="my-6 border border-[#cfcac0] bg-white p-5 w-full text-left font-mono text-xs text-stone-700 relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#fa6739]" />
              <div className="flex justify-between font-bold border-b pb-2 mb-3 text-zinc-950">
                <span>TAMILDEV TICKET</span>
                <span className="text-[#fa6739]">{bookingId}</span>
              </div>
              <p className="mb-1"><span className="text-stone-400">TYPE:</span> {sessionType}</p>
              <p className="mb-1"><span className="text-stone-400">DATE:</span> {selectedDate}</p>
              <p className="mb-1"><span className="text-stone-400">TIME:</span> {selectedTime}</p>
              <p className="mb-3"><span className="text-stone-400">HOST:</span> Niral Developer DevOps team</p>
              <p className="text-[10px] text-stone-400 italic">Confirmation link has been dispatched to {meetEmail}.</p>
            </div>
            <button
              onClick={reset}
              className="bg-zinc-950 hover:bg-zinc-900 text-white font-mono text-[10px] uppercase tracking-wider font-bold py-2.5 px-6 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          /* Booking form */
          <form onSubmit={handleBookMeeting} className="flex flex-col gap-4">
            {/* Session type */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1.5">
                1. Select Session Type
              </label>
              <select
                required
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full text-xs border border-[#cfcac0] p-2.5 bg-white text-zinc-950 focus:outline-none"
              >
                <option value="">-- Choose Session --</option>
                <option value="1-on-1 Code Review">1-on-1 Code Review (Vignesh/Kishore)</option>
                <option value="AI Integration Critique">AI Integration Critique (Saran)</option>
                <option value="Mobile/Android sync session">Mobile/Android Sync Session (dhidroid)</option>
                <option value="Figma UI/UX pairing">Figma UI/UX Pairing (Vijay LS)</option>
              </select>
            </div>

            {/* Date grid */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1.5">
                2. Choose Date
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {DATES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`text-left font-mono text-[10px] p-2 border transition-all ${
                      selectedDate === d
                        ? "border-[#fa6739] bg-[#fa6739]/5 text-[#fa6739] font-bold"
                        : "border-[#cfcac0] bg-white text-stone-600 hover:border-zinc-800"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1.5">
                  3. Choose Time Slot
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`text-left font-mono text-[10px] p-2 border transition-all ${
                        selectedTime === t
                          ? "border-[#fa6739] bg-[#fa6739]/5 text-[#fa6739] font-bold"
                          : "border-[#cfcac0] bg-white text-stone-600 hover:border-zinc-800"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* User info */}
            {selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3 pt-3 border-t border-[#cfcac0]/60"
              >
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1">Your Name</label>
                  <input
                    required
                    type="text"
                    value={meetName}
                    onChange={(e) => setMeetName(e.target.value)}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full text-xs border border-[#cfcac0] p-2.5 bg-white text-zinc-950 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-stone-500 mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={meetEmail}
                    onChange={(e) => setMeetEmail(e.target.value)}
                    placeholder="e.g. satoshi@bitcoin.org"
                    className="w-full text-xs border border-[#cfcac0] p-2.5 bg-white text-zinc-950 focus:outline-none"
                  />
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={!sessionType || !selectedDate || !selectedTime || !meetName || !meetEmail}
              className="w-full text-center bg-[#fa6739] hover:bg-[#e05629] text-white font-mono text-[11px] uppercase tracking-wider font-bold py-3 transition-colors disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed mt-2"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
