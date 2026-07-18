import React, { useState, useEffect } from "react";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { Link } from "react-router-dom";
import { termsConditionsDetails } from "../../constants/companyDetails";
import { FaChevronRight } from "react-icons/fa";
import { MdHeadsetMic, MdShoppingBag } from "react-icons/md";
import "./Terms_Conditions.css";

const Terms_Conditions = () => {
  const { title, lastUpdated, policyHighlights, sections } = termsConditionsDetails;

  const [expandedSections, setExpandedSections] = useState(() => {
    const initial = {};
    sections.forEach((sec) => {
      initial[sec.id] = true;
    });
    return initial;
  });

  const [activeSection, setActiveSection] = useState(1);
  const [showTOC, setShowTOC] = useState(false);

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length; i >= 1; i--) {
        const section = document.getElementById(`section-${i}`);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const section = document.getElementById(`section-${id}`);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      setExpandedSections((prev) => ({ ...prev, [id]: true }));
    }
  };

  return (
    <div className="global-padding py-5 xs:py-8 md:py-10 bg-[var(--bg-body)]">
      <ScrollToTop />
      <div className="w-full global-width">
        <div className="text-center mb-4 xs:mb-6 md:mb-8">
          <h1 className="heading">{title}</h1>
          <p className="sub-heading">Last Updated: {lastUpdated}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3.5 md:gap-4 mb-6 xs:mb-8">
          {policyHighlights.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg xs:rounded-xl p-2.5 xs:p-3.5 flex items-start gap-2 xs:gap-3 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="w-8 h-8 xs:w-10 xs:h-10 bg-[var(--primary-light)] text-[var(--primary)] rounded-lg flex items-center justify-center text-xs xs:text-base shrink-0 mt-0.5">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <div className="min-w-0">
                <h2 className="text-xs xs:text-sm font-bold text-[var(--text-dark)] mb-0.5 truncate">
                  {item.title}
                </h2>
                <p className="text-[9px] xs:text-[11px] text-[var(--text-secondary)] leading-tight line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowTOC(!showTOC)}
            className="w-full flex items-center justify-between bg-[var(--primary-light)] text-[var(--primary)] font-semibold py-2.5 px-3.5 rounded-lg border border-[var(--primary-medium)]/30 text-xs xs:text-sm"
          >
            <span>Table of Contents</span>
            <FaChevronRight
              className={`transition-transform duration-300 ${
                showTOC ? "rotate-90" : "rotate-0"
              }`}
            />
          </button>

          {showTOC && (
            <div className="mt-2 p-3 bg-[var(--bg-white)] rounded-lg shadow-md border border-[var(--border-default)]">
              <ul className="space-y-1">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => {
                        scrollToSection(sec.id);
                        setShowTOC(false);
                      }}
                      className={`w-full text-left py-1.5 px-2.5 rounded-md text-[11px] xs:text-xs transition-colors flex items-center gap-2 ${
                        activeSection === sec.id
                          ? "bg-[var(--primary-light)] text-[var(--primary)] font-bold"
                          : "text-[var(--text-primary)] hover:bg-[var(--bg-light)]"
                      }`}
                    >
                      <span className="font-semibold text-[var(--primary)] text-[10px]">
                        {sec.id < 10 ? `0${sec.id}` : sec.id}.
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="hidden md:block md:w-1/4 sticky top-33 shrink-0 w-full">
            <div className="bg-[var(--bg-white)] rounded-xl p-4 shadow-sm border border-[var(--border-default)]">
              <h2 className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-3 pb-2 border-b border-[var(--border-light)]">
                Contents
              </h2>
              <ul className="space-y-1">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left py-1.5 px-2.5 rounded-md text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                        activeSection === sec.id
                          ? "bg-[var(--primary-light)] text-[var(--primary)] font-bold"
                          : "text-[var(--text-primary)] hover:bg-[var(--bg-light)]"
                      }`}
                    >
                      <span className="font-semibold text-[var(--primary)] text-[11px]">
                        {sec.id < 10 ? `0${sec.id}` : sec.id}.
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-3/4 space-y-2.5 xs:space-y-3">
            {sections.map((sec) => {
              const isExpanded = expandedSections[sec.id];
              return (
                <div
                  key={sec.id}
                  id={`section-${sec.id}`}
                  className={`bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg xs:rounded-xl shadow-xs transition-all duration-200 scroll-mt-24 ${
                    isExpanded
                      ? "p-3.5 xs:p-5 md:p-6"
                      : "px-3.5 py-2.5 xs:px-5 xs:py-3 md:px-6 md:py-3.5"
                  }`}
                >
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className="w-full flex items-center justify-between text-left focus:outline-none active:scale-100 cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5 xs:gap-3">
                      <span className="text-xs xs:text-sm md:text-base font-bold text-[var(--primary)]">
                        {sec.id < 10 ? `0${sec.id}.` : `${sec.id}.`}
                      </span>
                      <h2 className="text-xs xs:text-sm md:text-base font-bold text-[var(--text-dark)] group-hover:text-[var(--primary)] transition-colors">
                        {sec.title}
                      </h2>
                    </div>
                    <div className="w-6 h-6 xs:w-7 xs:h-7 rounded-full bg-[var(--bg-light)] group-hover:bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] shrink-0 transition-colors">
                      <FaChevronRight
                        className={`text-[10px] xs:text-xs transition-transform duration-300 ${
                          isExpanded ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <div className={`faq-answer-container ${isExpanded ? "open" : ""}`}>
                    <div className="faq-answer-inner pt-2 xs:pt-3 border-t border-[var(--border-light)] space-y-2 xs:space-y-2.5 mt-2">
                      {sec.content.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-[11px] xs:text-xs md:text-sm text-[var(--text-primary)] leading-relaxed text-justify"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms_Conditions;
