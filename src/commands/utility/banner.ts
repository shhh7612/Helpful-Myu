import type { GuildMember } from 'discord.js';
import { Command } from '../../structures/command.js';

export default new Command({
    name: 'banner',
    description: 'Display another users banner, or your own',
    options: [
        {
            type: 6,
            name: 'query',
            description: 'User you want to view the avatar of',
        },
        {
            type: 5,
            name: 'hide',
            description: 'Hide the response',
        },
    ],
    aliases: [],
    category: 'utility',
    async slashCommand(interaction) {
        const user = (await interaction.options.get('query')?.user?.fetch(true)) || (await interaction.user.fetch(true));
        const banner = user.bannerURL({ size: 2048 });
        if (!banner) return interaction.editReply('User does not have a banner!!');

        interaction.editReply({
            embeds: [
                {
                    color: 0xafbbea,
                    title: user.tag + ' Banner',
                    description:
                        `**[Global Banner](${banner})**` +
                        `\n[JPG](${user.bannerURL({ size: 2048, extension: 'jpg', forceStatic: true })})` +
                        ` | [PNG](${user.bannerURL({ size: 2048, extension: 'png', forceStatic: true })})` +
                        ` | [WEBP](${user.bannerURL({ size: 2048, extension: 'webp', forceStatic: true })})` +
                        `${(banner as string).includes('.gif') ? ` | [GIF](${user.bannerURL({ size: 2048, extension: 'gif' })})` : ''}`,
                    image: {
                        url: banner as string,
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: `Requested by ${interaction.user.tag}`,
                        icon_url: interaction.user.displayAvatarURL(),
                    },
                },
            ],
        });
    },
    async prefixCommand(message, args) {
        let user = args[0] ? await message.client.users.fetch(args[0].replace('<@', '').replace('>', ''), { force: true }).catch((e) => {}) : await message.author.fetch(true);
        if (user === void 0) user = (await message.guild?.members.fetch({ query: args.join(' '), limit: 1 }))?.first()?.user || message.author;
        const banner = user.bannerURL({ size: 2048 });
        if (!banner) return message.reply('User does not have a banner!!');

        message.reply({
            embeds: [
                {
                    color: 0xafbbea,
                    title: user.tag + ' Banner',
                    description:
                        `**[Global Banner](${banner})**` +
                        `\n[JPG](${user.bannerURL({ size: 2048, extension: 'jpg', forceStatic: true })})` +
                        ` | [PNG](${user.bannerURL({ size: 2048, extension: 'png', forceStatic: true })})` +
                        ` | [WEBP](${user.bannerURL({ size: 2048, extension: 'webp', forceStatic: true })})` +
                        `${(banner as string).includes('.gif') ? ` | [GIF](${user.bannerURL({ size: 2048, extension: 'gif' })})` : ''}`,
                    image: {
                        url: banner as string,
                    },
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: `Requested by ${message.author.tag}`,
                        icon_url: message.author.displayAvatarURL(),
                    },
                },
            ],
        });
    },
});
