import { 
  pgTable, uuid, text, varchar, timestamp, boolean, 
  jsonb, integer, doublePrecision, index
} from "drizzle-orm/pg-core";

// Geography
export const districts = pgTable("districts", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
});

// Roles & Users
export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(), // SUPER_ADMIN, DISTRICT_OFFICER, etc.
  description: text("description"),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  publicId: varchar("public_id", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  phone: varchar("phone", { length: 20 }),
  status: varchar("status", { length: 50 }).default('ACTIVE'), // ACTIVE, SUSPENDED, PENDING
  verificationStatus: boolean("verification_status").default(false),
  roleId: uuid("role_id").references(() => roles.id),
  districtId: uuid("district_id").references(() => districts.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
});

// Organizations
export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  publicId: varchar("public_id", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // GOVERNMENT, UNIVERSITY, INDUSTRY
  districtId: uuid("district_id").references(() => districts.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Challenges & Projects
export const challenges = pgTable("challenges", {
  id: uuid("id").primaryKey().defaultRandom(),
  publicId: varchar("public_id", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  domain: varchar("domain", { length: 100 }),
  status: varchar("status", { length: 50 }).notNull().default('SUBMITTED'),
  districtId: uuid("district_id").references(() => districts.id),
  priorityLevel: varchar("priority_level", { length: 50 }),
  isDemo: boolean("is_demo").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  publicId: varchar("public_id", { length: 100 }).notNull().unique(),
  challengeId: uuid("challenge_id").references(() => challenges.id),
  title: varchar("title", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default('PROJECT_STARTED'), // PROTOTYPE, PILOT, DEPLOYED
  trlLevel: integer("trl_level"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// AI Governance
export const aiModels = pgTable("ai_models", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  version: varchar("version", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(), // EVALUATION, PRODUCTION, ARCHIVED
  accuracy: doublePrecision("accuracy"),
  precision: doublePrecision("precision"),
  requests: integer("requests").default(0),
  overrideRate: doublePrecision("override_rate").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aiDecisions = pgTable("ai_decisions", {
  id: uuid("id").primaryKey().defaultRandom(),
  challengeId: uuid("challenge_id").references(() => challenges.id),
  modelId: uuid("model_id").references(() => aiModels.id),
  decisionType: varchar("decision_type", { length: 100 }).notNull(), // CLASSIFICATION, PRIORITY, MATCHING
  result: jsonb("result").notNull(),
  confidence: doublePrecision("confidence"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const aiOverrides = pgTable("ai_overrides", {
  id: uuid("id").primaryKey().defaultRandom(),
  aiDecisionId: uuid("ai_decision_id").references(() => aiDecisions.id),
  userId: uuid("user_id").references(() => users.id),
  previousValue: jsonb("previous_value"),
  newValue: jsonb("new_value"),
  reason: text("reason"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// SLAs
export const slas = pgTable("slas", {
  id: uuid("id").primaryKey().defaultRandom(),
  entityType: varchar("entity_type", { length: 100 }).notNull(), // CHALLENGE, PROJECT, CONTRACT
  entityId: uuid("entity_id").notNull(),
  definition: varchar("definition", { length: 100 }).notNull(),
  deadline: timestamp("deadline").notNull(),
  status: varchar("status", { length: 50 }).notNull().default('ACTIVE'), // ACTIVE, BREACHED, COMPLETED
});

// Audit Trail
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorUserId: uuid("actor_user_id"),
  actorRole: varchar("actor_role", { length: 100 }),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 100 }),
  entityId: varchar("entity_id", { length: 100 }),
  previousValue: jsonb("previous_value"),
  newValue: jsonb("new_value"),
  reason: text("reason"),
  ipReference: varchar("ip_reference", { length: 100 }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Security Events
export const securityEvents = pgTable("security_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: varchar("type", { length: 100 }).notNull(),
  severity: varchar("severity", { length: 50 }).notNull(), // CRITICAL, HIGH, MEDIUM, LOW
  description: text("description"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
