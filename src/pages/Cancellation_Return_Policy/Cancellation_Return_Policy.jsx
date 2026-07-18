import React, { useState } from "react";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { Link } from "react-router-dom";
import { cancellationReturnPolicies, policyHighlights } from "../../constants/companyDetails";
import { MdHeadsetMic, MdShoppingBag } from "react-icons/md";
import "./Cancellation_Return_Policy.css";

const Cancellation_Return_Policy = () => {
  const [expandedSections, setExpandedSections] = useState(
    cancellationReturnPolicies.reduce((acc, policy) => ({ ...acc, [policy.id]: true }), {})
  );

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = (expand) => {
    const newState = cancellationReturnPolicies.reduce(
      (acc, policy) => ({ ...acc, [policy.id]: expand }),
      {}
    );
    setExpandedSections(newState);
  };

  const isAllExpanded = Object.values(expandedSections).every(Boolean);

  return (
    <div className="global-padding py-5 xs:py-8 md:py-10 bg-[var(--bg-body)]">
      <ScrollToTop />
      <div className="w-full global-width">
        <div className="text-center mb-4 xs:mb-6 md:mb-8">
          <h1 className="heading">Cancellation & Return Policy</h1>
          <p className="sub-heading">
            Learn about our hassle-free cancellation, return, refund, and replacement guidelines to ensure a smooth shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 md:gap-4 mb-5 xs:mb-8">
          {policyHighlights.map((highlight) => (
            <div
              key={highlight.id}
              className="bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg xs:rounded-xl p-2.5 xs:p-3.5 md:p-4 flex items-center gap-2 xs:gap-3.5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-8 h-8 xs:w-10 xs:h-11 rounded-md xs:rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center text-xs xs:text-base md:text-lg shrink-0">
                <i className={`fa-solid ${highlight.icon}`}></i>
              </div>
              <div className="min-w-0">
                <h4 className="text-[var(--text-dark)] font-semibold text-[11px] xs:text-xs md:text-sm truncate">{highlight.title}</h4>
                <p className="text-[var(--text-secondary)] text-[9px] xs:text-[11px] md:text-xs leading-tight line-clamp-2">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-3 xs:mb-4 px-1">
          <span className="text-[var(--text-secondary)] text-[11px] xs:text-xs md:text-sm font-medium">
            Policy Guidelines ({cancellationReturnPolicies.length} Sections)
          </span>
          <button
            onClick={() => toggleAll(!isAllExpanded)}
            className="text-[var(--primary)] hover:text-[var(--primary-medium)] text-[11px] xs:text-xs md:text-sm font-medium flex items-center gap-1 xs:gap-1.5 transition-colors cursor-pointer"
          >
            <i className={`fa-solid ${isAllExpanded ? "fa-compress" : "fa-expand"} text-[10px] xs:text-xs`}></i>
            {isAllExpanded ? "Collapse All" : "Expand All"}
          </button>
        </div>

        <div className="bg-[var(--bg-white)] rounded-lg xs:rounded-xl shadow-md p-3.5 xs:p-5 md:p-8">
          <div className="space-y-2.5 xs:space-y-4 w-full">
            {cancellationReturnPolicies.map((section, index) => (
              <div
                key={section.id}
                className="border-b border-[var(--border-light)] pb-2.5 xs:pb-3 last:border-0 last:pb-0"
              >
                <div
                  role="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex justify-between items-center text-left font-medium text-[var(--text-primary)] text-[11px] xs:text-sm md:text-base py-1.5 xs:py-2 hover:text-[var(--primary)] transition-colors duration-150 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 xs:gap-2.5">
                    <span className="shrink-0 font-bold text-[var(--primary)] text-[10px] xs:text-xs md:text-sm">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span>{section.title}</span>
                  </div>
                  <span className="text-[var(--primary)] shrink-0 ml-2 xs:ml-4">
                    <i className={`fa-solid ${expandedSections[section.id] ? "fa-chevron-up" : "fa-chevron-down"} text-[10px] xs:text-xs md:text-sm`}></i>
                  </span>
                </div>
                <div className={`faq-answer-container ${expandedSections[section.id] ? "open" : ""}`}>
                  <div className="faq-answer-inner">
                    <div className="pb-2.5 xs:pb-3 pl-3.5 xs:pl-6 text-[10px] xs:text-xs md:text-sm text-[var(--text-primary)] leading-relaxed space-y-2.5 xs:space-y-3.5">
                      {section.intro && <p className="mb-1 xs:mb-2">{section.intro}</p>}

                      {section.subsections && section.subsections.length > 0 && (
                        <div className={section.subsections.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-2.5 xs:gap-4" : "space-y-2.5 xs:space-y-3.5"}>
                          {section.subsections.map((sub, sIndex) => (
                            <div
                              key={sIndex}
                              className={`rounded-lg p-2.5 xs:p-3.5 md:p-4 border ${
                                sub.variant === "primary"
                                  ? "bg-[var(--primary-lighter)] border-[var(--primary-medium)]"
                                  : "bg-[var(--bg-light)] border-[var(--border-default)]"
                              }`}
                            >
                              <h3
                                className={`font-semibold text-[11px] xs:text-xs md:text-sm mb-1.5 xs:mb-2 flex items-center gap-1.5 xs:gap-2 ${
                                  sub.variant === "primary" ? "text-[var(--primary)]" : "text-[var(--text-dark)]"
                                }`}
                              >
                                {sub.icon && <i className={`fa-solid ${sub.icon} text-[10px] xs:text-xs md:text-sm`}></i>}
                                {sub.title}
                              </h3>
                              <ul className="space-y-1 xs:space-y-1.5 pl-3.5 xs:pl-5 list-disc text-[10px] xs:text-xs md:text-sm">
                                {sub.points.map((point, pIndex) => (
                                  <li key={pIndex}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 xs:mt-8 bg-[var(--primary)] text-[var(--text-white)] rounded-lg xs:rounded-xl p-4 xs:p-5 md:p-7 flex flex-col md:flex-row items-center justify-between gap-3.5 xs:gap-5 shadow-md">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-sm xs:text-base md:text-lg font-bold tracking-wide">Need Further Assistance?</h3>
            <p className="text-[10px] xs:text-xs md:text-sm text-[var(--primary-light)] max-w-lg leading-snug">
              Our dedicated customer support team is available to assist you with any questions regarding your cancellation, return, or refund.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 xs:gap-3 shrink-0">
            <Link
              to="/contact"
              className="bg-[var(--bg-white)] text-[var(--primary)] px-3.5 xs:px-4.5 py-1.5 xs:py-2 rounded-md xs:rounded-lg font-semibold text-[10px] xs:text-xs md:text-sm hover:bg-[var(--primary-lighter)] transition-all shadow-sm active:scale-[0.98] flex items-center gap-1.5"
            >
              <MdHeadsetMic className="text-xs xs:text-sm md:text-base" />
              Contact Support
            </Link>
            <Link
              to="/orders"
              className="bg-transparent border border-[var(--text-white)] text-[var(--text-white)] px-3.5 xs:px-4.5 py-1.5 xs:py-2 rounded-md xs:rounded-lg font-semibold text-[10px] xs:text-xs md:text-sm hover:bg-[var(--text-white)]/10 transition-all active:scale-[0.98] flex items-center gap-1.5"
            >
              <MdShoppingBag className="text-xs xs:text-sm md:text-base" />
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancellation_Return_Policy;