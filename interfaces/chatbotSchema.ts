export interface ChatbotSchema {
    id:              string;
    name:            string;
    createdAt:       Date;
    updatedAt:       Date;
    configuration:   ChatbotSchemaConfiguration;
    signingSecret:   string;
    states:          States;
    message:         Conversation;
    user:            Conversation;
    conversation:    Conversation;
    events:          Events;
    recurringEvents: RecurringEvents;
    integrations:    Integrations;
    deployedAt:      Date;
    medias:          any[];
    createdBy:       string;
    dev:             boolean;
}

export interface ChatbotSchemaConfiguration {
    data:   RecurringEvents;
    schema: ConfigurationSchema;
}

export interface RecurringEvents {
}

export interface ConfigurationSchema {
    type:                 string;
    properties:           RecurringEvents;
    additionalProperties: boolean;
}

export interface Conversation {
    tags: RecurringEvents;
}

export interface Events {
    schedulev1:   Schedulev1;
    botpublished: Bot;
    botready:     Bot;
}

export interface Bot {
    schema: BotpublishedSchema;
}

export interface BotpublishedSchema {
    type:       string;
    properties: PurpleProperties;
}

export interface PurpleProperties {
    publishedAt: PublishedAt;
}

export interface PublishedAt {
    type: string;
}

export interface Schedulev1 {
    schema: Schedulev1Schema;
}

export interface Schedulev1Schema {
    type:                 string;
    properties:           FluffyProperties;
    required:             string[];
    additionalProperties: boolean;
}

export interface FluffyProperties {
    destination: PublishedAt;
}

export interface Integrations {
    "87b01760-ede8-49d5-afc6-6afc0d0d1bdb": The87B01760Ede849D5Afc66Afc0D0D1Bdb;
}

export interface The87B01760Ede849D5Afc66Afc0D0D1Bdb {
    configuration: The87B01760Ede849D5Afc66Afc0D0D1BdbConfiguration;
    enabled:       boolean;
    name:          string;
    status:        string;
    statusReason:  null;
    version:       string;
    webhookUrl:    string;
    createdAt:     Date;
    updatedAt:     Date;
    title:         string;
    description:   string;
    id:            string;
    iconUrl:       string;
}

export interface The87B01760Ede849D5Afc66Afc0D0D1BdbConfiguration {
    messagingUrl: string;
    adminKey:     string;
    clientId:     string;
    clientToken:  string;
}

export interface States {
    agentsBotVariables:          AgentsBotVariables;
    agentsConversationVariables: AgentsBotVariables;
    agentsUserVariables:         AgentsBotVariables;
    agentsWorkflowsVariables:    AgentsBotVariables;
    botVariables:                AgentsBotVariables;
    context:                     AgentsBotVariables;
    session:                     AgentsBotVariables;
    userVariables:               AgentsBotVariables;
}

export interface AgentsBotVariables {
    type:   string;
    schema: RecurringEvents;
}
