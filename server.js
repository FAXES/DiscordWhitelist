//////////////////////////////////////////
// Discord Whitelist, NOT made by Astra //
//////////////////////////////////////////

/// Config Area ///

var whitelistRoles = [ // Roles by ID that are whitelisted.
    "333908428995035137"
]

var blacklistRoles = [ // Roles by Id that are blacklisted.
    "333908428995035137"
]

var notWhitelistedMessage = "You're Not Whitelisted. This sever is whitelisted and requires access to join."
var noGuildMessage = "Guild Not Detected. It seems you're not in the guild for this community."
var blacklistMessage = "You're blacklisted from this server."
var debugMode = false

/// Code ///
on('playerConnecting', (name, setKickReason, deferrals) => {
    let src = global.source;
    deferrals.defer()

    setTimeout(() => {
        deferrals.update(`Hello ${name}. Your Discord ID is being checked with our whitelist.`)

        let identifierDiscord = null;

        for (let i = 0; i < GetNumPlayerIdentifiers(src); i++) {
            const identifier = GetPlayerIdentifier(src, i);

            if (identifier.includes('discord:')) {
                identifierDiscord = identifier;
            }
        }
        setTimeout(() => {
            if(identifierDiscord) {
                exports['discordroles']['isRolePresent'](src, blacklistRoles, function(hasRole, roles) {
                    if(hasRole) {
                        deferrals.done(blacklistMessage);
                        if(debugMode) console.log(`^5[DiscordWhitelist]^7 '${name}' with ID '${identifierDiscord.replace('discord:', '')}' is blacklisted to join this server.`)
                    }
                })
                exports['discordroles']['isRolePresent'](src, whitelistRoles, function(hasRole, roles) {
                    if(!roles) {
                        deferrals.done(noGuildMessage)
                        if(debugMode) console.log(`^5[DiscordWhitelist]^7 '${name}' with ID '${identifierDiscord.replace('discord:', '')}' cannot be found in the assigned guild and was not granted access.`)
                    }
                    if(hasRole) {
                        deferrals.done()
                        if(debugMode) console.log(`^5[DiscordWhitelist]^7 '${name}' with ID '${identifierDiscord.replace('discord:', '')}' was granted access and passed the whitelist.`)
                    } else {
                        deferrals.done(notWhitelistedMessage)
                        if(debugMode) console.log(`^5[DiscordWhitelist]^7 '${name}' with ID '${identifierDiscord.replace('discord:', '')}' is not whitelisted to join this server.`)
                    }
                })
            } else {
                deferrals.done(`Discord was not detected. Please make sure Discord is running and installed. See the below link for a debugging process - docs.faxes.zone/docs/debugging-discord`)
                if(debugMode) console.log(`^5[DiscordWhitelist]^7 '${name}' was not granted access as a Discord identifier could not be found.`)
            }
        }, 0)
    }, 0)
})