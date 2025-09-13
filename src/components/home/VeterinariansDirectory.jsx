import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VeterinariansDirectory = () => {
  const [filters, setFilters] = useState({
    specialty: "",
    availability: "",
    rating: "",
    experience: "",
    search: "",
  });

  const veterinarians = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Practice",
      experience: "12 years",
      rating: 4.9,
      availability: "Mon, Wed, Fri",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
      education: "DVM, Cornell University",
      languages: ["English", "Spanish"],
      services: ["Checkups", "Vaccinations", "Dental Care"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Surgery",
      experience: "8 years",
      rating: 4.8,
      availability: "Tue, Thu, Sat",
      location: "Los Angeles, CA",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
      education: "DVM, UC Davis",
      languages: ["English", "Mandarin"],
      services: ["Orthopedic Surgery", "Soft Tissue Surgery", "Emergency Care"],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      experience: "15 years",
      rating: 4.9,
      availability: "Mon, Tue, Thu",
      location: "Chicago, IL",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300",
      education: "DVM, University of Florida",
      languages: ["English", "Spanish"],
      services: ["Skin Allergies", "Ear Infections", "Parasite Control"],
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Emergency Care",
      experience: "10 years",
      rating: 4.7,
      availability: "24/7 Rotation",
      location: "Houston, TX",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300",
      education: "DVM, Texas A&M",
      languages: ["English"],
      services: ["Trauma Care", "Toxicology", "Critical Care"],
    },
    {
      id: 5,
      name: "Dr. Lisa Patel",
      specialty: "Cardiology",
      experience: "14 years",
      rating: 4.9,
      availability: "Wed, Fri, Sat",
      location: "Phoenix, AZ",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
      education: "DVM, University of Pennsylvania",
      languages: ["English", "Hindi"],
      services: [
        "Echocardiography",
        "Cardiac Surgery",
        "Hypertension Management",
      ],
    },
    {
      id: 6,
      name: "Dr. Robert Kim",
      specialty: "Oncology",
      experience: "11 years",
      rating: 4.8,
      availability: "Mon, Tue, Fri",
      location: "Seattle, WA",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
      education: "DVM, Washington State University",
      languages: ["English", "Korean"],
      services: ["Chemotherapy", "Radiation Therapy", "Palliative Care"],
    },
  ];

  const filteredVets = veterinarians.filter((vet) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      if (key === "search") {
        const searchTerm = value.toLowerCase();
        return (
          vet.name.toLowerCase().includes(searchTerm) ||
          vet.specialty.toLowerCase().includes(searchTerm) ||
          vet.location.toLowerCase().includes(searchTerm) ||
          vet.services.some((service) =>
            service.toLowerCase().includes(searchTerm)
          )
        );
      }

      return vet[key]?.toString().toLowerCase().includes(value.toLowerCase());
    });
  });

  const specialties = [...new Set(veterinarians.map((vet) => vet.specialty))];
  const experiences = ["1-5 years", "6-10 years", "11-15 years", "16+ years"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl font-display">
            Expert <span className="text-primary-600">Veterinarians</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-neutral-600 md:text-xl">
            Connect with experienced veterinary professionals for your pet's
            care
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 mb-8 bg-white border shadow-sm rounded-2xl border-neutral-200"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Search veterinarians, specialties, locations..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <select
              value={filters.specialty}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, specialty: e.target.value }))
              }
              className="px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>

            <select
              value={filters.experience}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, experience: e.target.value }))
              }
              className="px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Any Experience</option>
              {experiences.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>

            <select
              value={filters.rating}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, rating: e.target.value }))
              }
              className="px-4 py-3 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Any Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.7">4.7+ Stars</option>
              <option value="4.9">4.9+ Stars</option>
            </select>
          </div>
        </motion.div>

        {/* Veterinarians Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredVets.map((vet) => (
            <motion.div
              key={vet.id}
              variants={itemVariants}
              className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl group"
            >
              <div className="relative">
                <img
                  src={vet.image}
                  alt={vet.name}
                  className="object-cover w-full h-48 object-top"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-primary-500">
                    {vet.specialty}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 font-display">
                      {vet.name}
                    </h3>
                    <p className="text-primary-600">{vet.specialty}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 font-medium">{vet.rating}</span>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-neutral-600">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {vet.location}
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {vet.availability}
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V6m0 0v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6"
                      />
                    </svg>
                    {vet.experience} experience
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-neutral-900">
                    Services:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {vet.services.slice(0, 3).map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded bg-neutral-100 text-neutral-600"
                      >
                        {service}
                      </span>
                    ))}
                    {vet.services.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded bg-neutral-100 text-neutral-600">
                        +{vet.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    to="/auth/register"
                    className="block w-full px-4 py-3 font-medium text-center text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600"
                  >
                    Book Appointment
                  </Link>
                  <Link
                    to={`/veterinarians/${vet.id}`}
                    className="block w-full px-4 py-2 text-center transition-colors duration-300 border rounded-lg text-primary-600 border-primary-500 hover:bg-primary-50"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredVets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 mt-8 text-center bg-white border rounded-2xl border-neutral-200"
          >
            <div className="w-20 h-20 mx-auto mb-6 text-neutral-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.87-6.09 2.29M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-neutral-900">
              No veterinarians found
            </h3>
            <p className="mb-6 text-neutral-600">
              Try adjusting your search criteria or browse all veterinarians
            </p>
            <button
              onClick={() =>
                setFilters({
                  specialty: "",
                  availability: "",
                  rating: "",
                  experience: "",
                  search: "",
                })
              }
              className="px-6 py-3 font-medium transition-colors duration-300 border rounded-lg text-primary-600 border-primary-500 hover:bg-primary-50"
            >
              Show All Veterinarians
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="p-8 border bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border-primary-100">
            <h3 className="mb-4 text-2xl font-semibold text-neutral-900 font-display">
              Are You a Veterinarian?
            </h3>
            <p className="max-w-2xl mx-auto mb-6 text-neutral-600">
              Join our network of trusted veterinary professionals and reach
              thousands of pet owners
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/auth/signup"
                className="px-8 py-4 font-semibold text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600"
              >
                Join as Veterinarian
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 font-semibold transition-colors duration-300 border rounded-lg text-primary-600 border-primary-500 hover:bg-primary-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VeterinariansDirectory;
