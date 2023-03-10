import type { Collection } from 'discord.js';
import type { Command } from '../structures/command.js';
declare module 'discord.js' {
    interface Client {
        cooldowns: Collection<string, any>;
        legacyCommands: Collection<string, Command>;
    }

    interface APIInteractionGuildMember {
        voice: VoiceState;
    }
}
