"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const ROLE_CATEGORIES = [
  {
    name: "Relationship",
    roles: [
      { id: "stranger", name: "Stranger", tendencies: ["polite", "guarded"], capabilities: ["small talk"] },
      { id: "acquaintance", name: "Acquaintance", tendencies: ["friendly", "curious"], capabilities: ["casual chat", "shared context"] },
      { id: "friend", name: "Friend", tendencies: ["warm", "supportive"], capabilities: ["emotional support", "shared activities"] },
      { id: "close_friend", name: "Close Friend", tendencies: ["trusted", "vulnerable"], capabilities: ["deep conversation", "mutual aid"] },
      { id: "best_friend", name: "Best Friend", tendencies: ["intimate", "loyal"], capabilities: ["complete honesty", "shared life"] },
      { id: "romantic_interest", name: "Romantic Interest", tendencies: ["attentive", "fluttery"], capabilities: ["flirting", "date planning"] },
      { id: "partner", name: "Partner", tendencies: ["committed", "intertwined"], capabilities: ["shared decisions", "life planning"] },
      { id: "spouse", name: "Spouse", tendencies: ["bound", "devoted"], capabilities: ["legal partnership", "family building"] },
      { id: "sibling", name: "Sibling", tendencies: ["familiar", "protective"], capabilities: ["shared history", "family dynamics"] },
      { id: "parent_like", name: "Parent-like", tendencies: ["guiding", "protective"], capabilities: ["advice", "emotional anchor"] },
      { id: "cousin", name: "Cousin", tendencies: ["familial", "relaxed"], capabilities: ["family gatherings", "shared relatives"] },
    ],
  },
  {
    name: "Social",
    roles: [
      { id: "mentor", name: "Mentor", tendencies: ["guiding", "patient"], capabilities: ["career advice", "skill building"] },
      { id: "travel_companion", name: "Travel Companion", tendencies: ["adventurous", "flexible"], capabilities: ["trip planning", "navigation"] },
      { id: "road_trip_friend", name: "Road Trip Friend", tendencies: ["spontaneous", "good DJ"], capabilities: ["playlist curation", "snack management"] },
      { id: "gym_friend", name: "Gym Friend", tendencies: ["motivating", "disciplined"], capabilities: ["spotting", "form checks"] },
      { id: "hiking_friend", name: "Hiking Friend", tendencies: ["outdoorsy", "prepared"], capabilities: ["trail knowledge", "gear advice"] },
      { id: "nightlife_friend", name: "Nightlife Friend", tendencies: ["energetic", "social"], capabilities: ["venue knowledge", "group coordination"] },
      { id: "food_friend", name: "Food Friend", tendencies: ["adventurous eater", "knowledgeable"], capabilities: ["restaurant picks", "cooking together"] },
      { id: "music_friend", name: "Music Friend", tendencies: ["eclectic taste", "passionate"], capabilities: ["concert buddy", "playlist sharing"] },
      { id: "gaming_friend", name: "Gaming Friend", tendencies: ["competitive", "cooperative"], capabilities: ["co-op play", "strategy discussion"] },
    ],
  },
  {
    name: "Intellectual",
    roles: [
      { id: "intellectual_friend", name: "Intellectual Friend", tendencies: ["curious", "analytical"], capabilities: ["deep discussion", "idea exchange"] },
      { id: "debate_friend", name: "Debate Friend", tendencies: ["sharp", "respectful"], capabilities: ["argument mapping", "steel-manning"] },
      { id: "creative_friend", name: "Creative Friend", tendencies: ["imaginative", "inspiring"], capabilities: ["brainstorming", "feedback"] },
      { id: "founder_friend", name: "Founder Friend", tendencies: ["builder", "pragmatic"], capabilities: ["product feedback", "fundraising tips"] },
      { id: "storyteller", name: "Storyteller", tendencies: ["engaging", "observant"], capabilities: ["narrative weaving", "memory keeping"] },
      { id: "listener", name: "Listener", tendencies: ["attentive", "non-judgmental"], capabilities: ["active listening", "space holding"] },
      { id: "comic_relief", name: "Comic Relief", tendencies: ["witty", "lighthearted"], capabilities: ["tension breaking", "perspective shifting"] },
    ],
  },
  {
    name: "Activity",
    roles: [
      { id: "social_connector", name: "Social Connector", tendencies: ["networked", "inclusive"], capabilities: ["introductions", "group forming"] },
    ],
  },
  {
    name: "Wildcard",
    roles: [
      { id: "wildcard", name: "Wildcard", tendencies: ["unpredictable", "dynamic"], capabilities: ["anything", "surprise"] },
    ],
  },
];

const PERSON_EXAMPLE = {
  name: "Emma Reyes",
  bio: "Product designer with a soft spot for analog cameras.",
  assignedRoles: ["friend", "intellectual_friend", "travel_companion", "storyteller", "listener"],
};

export function RolesShowcase() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="roles"
      ref={containerRef}
      className="section relative overflow-hidden"
      aria-labelledby="roles-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            id="roles-heading"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            Composable Roles
          </h2>
          <p className="text-body-lg text-muted-foreground">
            29 reusable behavior definitions. Assign at zero cost. One person, many facets — never multiple agents.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
          role="tablist"
          aria-label="Role categories"
        >
          {ROLE_CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              role="tab"
              aria-selected={selectedCategory === i}
              aria-controls={`panel-${cat.name}`}
              id={`tab-${cat.name}`}
              onClick={() => setSelectedCategory(i)}
              className={cn(
                "px-5 py-2.5 rounded-xl border-2 font-medium transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selectedCategory === i
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))/5] text-foreground shadow-glow"
                  : "border-transparent hover:border-[hsl(var(--border))] bg-muted/50 text-muted-foreground"
              )}
            >
              {cat.name}
              <span className="ml-2 text-xs text-muted-foreground">
                ({cat.roles.length})
              </span>
            </button>
          ))}
        </div>

        {/* Role Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
          role="tabpanel"
          aria-labelledby={`tab-${ROLE_CATEGORIES[selectedCategory].name}`}
        >
          {ROLE_CATEGORIES[selectedCategory].roles.map((role, i) => (
            <RoleCard
              key={role.id}
              role={role}
              isAssigned={PERSON_EXAMPLE.assignedRoles.includes(role.id)}
              isHovered={hoveredRole === role.id}
              onHover={() => setHoveredRole(role.id)}
              onLeave={() => setHoveredRole(null)}
              delay={i * 50}
            />
          ))}
        </div>

        {/* Person Example */}
        <div
          className="mt-16 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.6s" }}
        >
          <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
            Example: {PERSON_EXAMPLE.name}
          </h3>
          <p className="text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
            {PERSON_EXAMPLE.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {PERSON_EXAMPLE.assignedRoles.map((roleId) => {
              const role = ROLE_CATEGORIES.flatMap((c) => c.roles).find((r) => r.id === roleId);
              if (!role) return null;
              return (
                <span
                  key={role.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                >
                  🎭 {role.name}
                </span>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              5 roles assigned. <strong className="text-foreground">Zero inference cost.</strong> At scene time, only context-relevant roles compose into the Actor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleCard({
  role,
  isAssigned,
  isHovered,
  onHover,
  onLeave,
  delay,
}: {
  role: (typeof ROLE_CATEGORIES)[0]["roles"][0];
  isAssigned: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
}) {
  return (
    <article
      className={cn(
        "relative rounded-xl border p-5 transition-all duration-300",
        "hover:shadow-elevation-2 hover:border-primary/30",
        isAssigned ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-transparent",
        isHovered && "scale-[1.02] shadow-glow"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.5s ease-out",
      }}
      onAnimationEnd={() => {}}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">🎭</span>
          <div>
            <h4 className="font-semibold text-foreground">{role.name}</h4>
            {isAssigned && (
              <span className="badge-primary text-xs">Assigned to Emma</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-muted-foreground mb-1">Tendencies</p>
          <div className="flex flex-wrap gap-1">
            {role.tendencies.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-medium text-muted-foreground mb-1">Capabilities</p>
          <div className="flex flex-wrap gap-1">
            {role.capabilities.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded text-xs bg-muted/50 text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isAssigned && (
        <div className="mt-4 pt-4 border-t border-primary/20">
          <p className="text-xs text-primary font-medium">
            ✓ Active in Emma&apos;s Actor when context-relevant
          </p>
        </div>
      )}
    </article>
  );
}