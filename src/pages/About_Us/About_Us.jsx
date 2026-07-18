import React from "react";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { companyDetails, aboutUsDetails } from "../../constants/companyDetails";
import { FaLinkedinIn, FaTwitter, FaGithub, FaInstagram, FaFacebookF, FaGlobe } from "react-icons/fa";
import "./About_Us.css";

const About_Us = () => {
  const { hero, mission, values } = aboutUsDetails;

  const stats = [
    {
      id: 1,
      value: companyDetails.businessStats?.totalCustomers || "10M+",
      label: "Happy Customers",
      icon: "fa-users",
    },
    {
      id: 2,
      value: companyDetails.businessStats?.totalOrders || "5M+",
      label: "Orders Delivered",
      icon: "fa-truck-fast",
    },
    {
      id: 3,
      value: companyDetails.businessStats?.totalCitiesCovered || "50+",
      label: "Cities Covered",
      icon: "fa-store",
    },
  ];

  const team = companyDetails.companyMembers || companyDetails.companyMembers || [];

  return (
    <div className="global-padding py-4 xs:py-8 md:py-10 bg-[var(--bg-body)]">
      <ScrollToTop />
      <div className="w-full global-width">
        <div className="text-center mb-3 xs:mb-6 md:mb-8">
          <h1 className="heading">{hero.title}</h1>
          <p className="sub-heading">{hero.subtitle}</p>
        </div>

        <div className="bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg xs:rounded-xl shadow-md p-3 xs:p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 xs:mb-8">
          <div className="md:w-1/2 space-y-2 xs:space-y-4">
            <h2 className="text-sm xs:text-lg md:text-xl font-bold text-[var(--text-dark)]">
              Welcome to <span className="text-[var(--primary)]">BazaarWale</span>
            </h2>
            <p className="text-[10px] xs:text-xs md:text-sm text-[var(--text-primary)] leading-relaxed">
              {hero.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 xs:gap-3.5 pt-1 xs:pt-2">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-lg p-2 xs:p-3 text-center shadow-xs"
                >
                  <div className="text-[var(--primary)] text-xs xs:text-base mb-0.5 xs:mb-1">
                    <i className={`fa-solid ${stat.icon}`}></i>
                  </div>
                  <p className="text-xs xs:text-sm md:text-base font-bold text-[var(--primary)]">
                    {stat.value}
                  </p>
                  <p className="text-[9px] xs:text-[11px] text-[var(--text-secondary)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <img
              src={hero.image}
              alt="BazaarWale Team"
              className="rounded-lg shadow-sm w-full h-40 xs:h-64 md:h-72 object-cover border-2 border-[var(--border-light)]"
            />
          </div>
        </div>

        <div className="bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg xs:rounded-xl shadow-md p-3 xs:p-6 md:p-8 mb-4 xs:mb-8">
          <div className="text-center mb-3 xs:mb-6">
            <h2 className="text-sm xs:text-lg md:text-xl font-bold text-[var(--text-dark)] inline-block border-b-2 border-[var(--primary)] pb-1">
              {mission.title}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="md:w-1/2 w-full">
              <img
                src={mission.image}
                alt="Our Mission"
                className="rounded-lg shadow-sm w-full h-36 xs:h-56 md:h-64 object-cover border-2 border-[var(--border-light)]"
              />
            </div>
            <div className="md:w-1/2 space-y-2.5 xs:space-y-3">
              <p className="text-[10px] xs:text-xs md:text-sm text-[var(--text-primary)] leading-relaxed">
                {mission.description}
              </p>
              <ul className="space-y-1.5 xs:space-y-2">
                {mission.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 bg-[var(--bg-light)] p-2 xs:p-2.5 rounded-md border border-[var(--border-light)] text-[10px] xs:text-xs md:text-sm text-[var(--text-primary)]">
                    <i className="fa-solid fa-circle-check text-[var(--primary)] text-xs xs:text-sm mt-0.5 shrink-0"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-4 xs:mb-8">
          <div className="text-center mb-3 xs:mb-6">
            <h2 className="text-sm xs:text-lg md:text-xl font-bold text-[var(--text-dark)] inline-block border-b-2 border-[var(--primary)] pb-1">
              Our Core Values
            </h2>
            <p className="text-[10px] xs:text-xs text-[var(--text-secondary)] mt-1">
              The principles that guide everything we do at BazaarWale
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3.5 md:gap-4">
            {values.map((val) => (
              <div
                key={val.id}
                className="bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg xs:rounded-xl p-2.5 xs:p-4 text-center hover:border-[var(--primary)] shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 xs:w-11 xs:h-11 bg-[var(--primary-light)] text-[var(--primary)] rounded-full flex items-center justify-center text-xs xs:text-base mb-1.5 xs:mb-2.5 mx-auto">
                  <i className={`fa-solid ${val.icon}`}></i>
                </div>
                <h3 className="text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-0.5 xs:mb-1">
                  {val.title}
                </h3>
                <p className="text-[9px] xs:text-[11px] text-[var(--text-secondary)] leading-tight">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-white)] border border-[var(--border-default)] rounded-lg xs:rounded-xl shadow-md p-3 xs:p-6 md:p-8">
          <div className="text-center mb-3 xs:mb-6">
            <h2 className="text-sm xs:text-lg md:text-xl font-bold text-[var(--text-dark)] inline-block border-b-2 border-[var(--primary)] pb-1">
              Meet Our Leadership
            </h2>
            <p className="text-[10px] xs:text-xs text-[var(--text-secondary)] mt-1">
              The talented individuals behind BazaarWale's success
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 xs:gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-[var(--bg-light)] border border-[var(--border-light)] rounded-lg xs:rounded-xl p-2.5 xs:p-4 text-left sm:text-center shadow-xs hover:shadow-md transition-all flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 justify-between"
              >
                <div className="shrink-0 mb-0 sm:mb-3 w-14 h-14 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[var(--primary-light)] mx-0 sm:mx-auto">
                  <img
                    src={member.profileUrl || member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs xs:text-sm font-semibold text-[var(--text-dark)] mb-0.5 truncate">
                      {member.name}
                    </h3>
                    <p className="text-[10px] xs:text-xs text-[var(--primary)] font-medium mb-1 truncate">
                      {member.role}
                    </p>
                    <p className="text-[9px] xs:text-[11px] text-[var(--text-secondary)] mb-2 leading-tight line-clamp-2">
                      {member.description || member.bio}
                    </p>
                  </div>
                  {member.socialUrl && (
                    <div className="flex flex-wrap justify-start sm:justify-center gap-1.5 pt-0.5">
                      {member.socialUrl.linkedin && (
                        <a
                          href={member.socialUrl.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="w-6 h-6 xs:w-7 xs:h-7 bg-[var(--bg-white)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--text-white)] transition-colors border border-[var(--border-light)] text-[10px] xs:text-xs"
                        >
                          <FaLinkedinIn />
                        </a>
                      )}
                      {member.socialUrl.github && (
                        <a
                          href={member.socialUrl.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="w-6 h-6 xs:w-7 xs:h-7 bg-[var(--bg-white)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--text-white)] transition-colors border border-[var(--border-light)] text-[10px] xs:text-xs"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {member.socialUrl.twitter && (
                        <a
                          href={member.socialUrl.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                          className="w-6 h-6 xs:w-7 xs:h-7 bg-[var(--bg-white)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--text-white)] transition-colors border border-[var(--border-light)] text-[10px] xs:text-xs"
                        >
                          <FaTwitter />
                        </a>
                      )}
                      {member.socialUrl.instagram && (
                        <a
                          href={member.socialUrl.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="w-6 h-6 xs:w-7 xs:h-7 bg-[var(--bg-white)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--text-white)] transition-colors border border-[var(--border-light)] text-[10px] xs:text-xs"
                        >
                          <FaInstagram />
                        </a>
                      )}
                      {member.socialUrl.facebook && (
                        <a
                          href={member.socialUrl.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="w-6 h-6 xs:w-7 xs:h-7 bg-[var(--bg-white)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--text-white)] transition-colors border border-[var(--border-light)] text-[10px] xs:text-xs"
                        >
                          <FaFacebookF />
                        </a>
                      )}
                      {member.socialUrl.portfolio && (
                        <a
                          href={member.socialUrl.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Portfolio"
                          className="w-6 h-6 xs:w-7 xs:h-7 bg-[var(--bg-white)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--text-white)] transition-colors border border-[var(--border-light)] text-[10px] xs:text-xs"
                        >
                          <FaGlobe />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_Us;
