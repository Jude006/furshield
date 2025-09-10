import React from 'react';
import { motion } from 'framer-motion';

const TeamShowcase = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
      bio: "Former veterinary tech with 10+ years in pet care. Passionate about animal welfare.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Lead Veterinarian",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      bio: "DVM with 15 years experience. Specialized in emergency care and surgery.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Product Design",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
      bio: "UX designer focused on creating seamless pet care experiences.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
      bio: "Tech innovator building the future of pet care technology.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 5,
      name: "Amanda Wilson",
      role: "Head of Partnerships",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
      bio: "Connecting shelters and vets to create a comprehensive care network.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 6,
      name: "James Thompson",
      role: "Animal Behaviorist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      bio: "Certified behavior specialist ensuring pets' mental wellbeing.",
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-3xl font-light text-neutral-900 sm:text-4xl md:text-5xl font-display">
            Meet Our <span className="text-primary-600">Dream Team</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-neutral-600 md:text-xl">
            Passionate experts dedicated to revolutionizing pet care through innovation and compassion.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="text-center group"
            >
              {/* Image Container */}
              <div className="relative mb-6">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full transition-transform duration-700 h-80 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100" />
                </div>
                
                {/* Social Links */}
                <motion.div 
                  className="absolute flex space-x-3 transition-opacity duration-300 transform -translate-x-1/2 opacity-0 bottom-4 left-1/2 group-hover:opacity-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <a href={member.social.linkedin} className="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-primary-50">
                    <span className="text-neutral-700">in</span>
                  </a>
                  <a href={member.social.twitter} className="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full shadow-lg hover:bg-primary-50">
                    <span className="text-neutral-700">𝕏</span>
                  </a>
                </motion.div>
              </div>

              {/* Content */}
              <div>
                <h3 className="mb-2 text-xl font-semibold text-neutral-900 font-display">
                  {member.name}
                </h3>
                <p className="mb-3 font-medium text-primary-600">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="p-8 border bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border-primary-100">
            <h3 className="mb-4 text-2xl font-light text-neutral-900 font-display">
              Join Our Mission
            </h3>
            <p className="max-w-2xl mx-auto mb-6 text-neutral-600">
              We're always looking for passionate individuals who want to make a difference in pet care.
            </p>
            <button className="px-8 py-4 font-medium text-white transition-colors duration-300 rounded-full bg-primary-600 hover:bg-primary-700">
              View Open Positions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamShowcase;