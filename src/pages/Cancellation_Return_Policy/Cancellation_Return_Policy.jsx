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
    <div className="global-padding py-6 xs:py-8 md:py-10 bg-[var(--bg-body)]">
      <ScrollToTop />
      <div className="w-full global-width">
        <div className="text-center mb-5 xs:mb-6 md:mb-8">
          <h1 className="heading">Cancellation & Return Policy</h1>
          <p className="sub-heading">
            Learn about our hassle-free cancellation, return, refund, and replacement guidelines to ensure a smooth shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {policyHighlights.map((highlight) => (
            <div
              key={highlight.id}
              className="bg-[var(--bg-white)] border border-[var(--border-default)] rounded-xl p-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center text-lg shrink-0">
                <i className={`fa-solid ${highlight.icon}`}></i>
              </div>
              <div>
                <h4 className="text-[var(--text-dark)] font-semibold text-xs xs:text-sm">{highlight.title}</h4>
                <p className="text-[var(--text-secondary)] text-[11px] xs:text-xs leading-snug">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-[var(--text-secondary)] text-xs xs:text-sm font-medium">
            Policy Guidelines ({cancellationReturnPolicies.length} Sections)
          </span>
          <button
            onClick={() => toggleAll(!isAllExpanded)}
            className="text-[var(--primary)] hover:text-[var(--primary-medium)] text-xs xs:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <i className={`fa-solid ${isAllExpanded ? "fa-compress" : "fa-expand"}`}></i>
            {isAllExpanded ? "Collapse All" : "Expand All"}
          </button>
        </div>

        <div className="bg-[var(--bg-white)] rounded-xl shadow-lg p-5 xs:p-6 md:p-8">
          <div className="space-y-4 w-full">
            {cancellationReturnPolicies.map((section, index) => (
              <div
                key={section.id}
                className="border-b border-[var(--border-light)] pb-3 last:border-0 last:pb-0"
              >
                <div
                  role="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex justify-between items-center text-left font-medium text-[var(--text-primary)] text-[11px] xs:text-sm md:text-base py-2 hover:text-[var(--primary)] transition-colors duration-150 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="shrink-0 font-bold text-[var(--primary)] text-[10px] xs:text-sm">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span>{section.title}</span>
                  </div>
                  <span className="text-[var(--primary)] shrink-0 ml-4">
                    <i className={`fa-solid ${expandedSections[section.id] ? "fa-chevron-up" : "fa-chevron-down"} text-xs md:text-sm`}></i>
                  </span>
                </div>
                <div className={`faq-answer-container ${expandedSections[section.id] ? "open" : ""}`}>
                  <div className="faq-answer-inner">
                    <div className="pb-3 pl-6 text-[10px] xs:text-xs md:text-sm text-[var(--text-primary)] leading-relaxed space-y-4">
                      {section.intro && <p>{section.intro}</p>}

                      {section.subsections && section.subsections.length > 0 && (
                        <div className={section.subsections.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
                          {section.subsections.map((sub, sIndex) => (
                            <div
                              key={sIndex}
                              className={`rounded-lg p-4 border ${sub.variant === "primary"
                                  ? "bg-[var(--primary-lighter)] border-[var(--primary-medium)]"
                                  : "bg-[var(--bg-light)] border-[var(--border-default)]"
                                }`}
                            >
                              <h3
                                className={`font-semibold text-xs xs:text-sm mb-2 flex items-center gap-2 ${sub.variant === "primary" ? "text-[var(--primary)]" : "text-[var(--text-dark)]"
                                  }`}
                              >
                                {sub.icon && <i className={`fa-solid ${sub.icon}`}></i>}
                                {sub.title}
                              </h3>
                              <ul className="space-y-2 pl-5 list-disc">
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

        <div className="mt-8 bg-[var(--primary)] text-[var(--text-white)] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="text-center md:text-left space-y-1.5">
            <h3 className="text-lg xs:text-xl font-bold tracking-wide">Need Further Assistance?</h3>
            <p className="text-xs xs:text-sm text-[var(--primary-light)] max-w-lg">
              Our dedicated customer support team is available to assist you with any questions regarding your cancellation, return, or refund.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="bg-[var(--bg-white)] text-[var(--primary)] px-5 py-2.5 rounded-lg font-semibold text-xs xs:text-sm hover:bg-[var(--primary-lighter)] transition-all shadow-md active:scale-[0.98] flex items-center gap-2"
            >
              <MdHeadsetMic className="text-base xs:text-lg" />
              Contact Support
            </Link>
            <Link
              to="/orders"
              className="bg-transparent border border-[var(--text-white)] text-[var(--text-white)] px-5 py-2.5 rounded-lg font-semibold text-xs xs:text-sm hover:bg-[var(--text-white)]/10 transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <MdShoppingBag className="text-base xs:text-lg" />
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancellation_Return_Policy;