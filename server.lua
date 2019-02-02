----------------------------------------
--- Discord Whitelist, Made by FAXES ---
----------------------------------------

--- Config ---
roleNeeded = "Member" -- The role nickname needed to pass the whitelist
notWhitelisted = "You are not whitelisted for this server." -- Message displayed when they are not whitelist with the role
noDiscord = "You must have Discord open to join this server." -- Message displayed when discord is not found


--- Code ---

AddEventHandler("playerConnecting", function(name, setCallback, deferrals)
    local src = source
    deferrals.defer()
    deferrals.update("Checking Permissions")

    for k, v in ipairs(GetPlayerIdentifiers(src)) do
        if string.sub(v, 1, string.len("discord:")) == "discord:" then
            identifierDiscord = v
        end
    end

    local allowed = false
    if identifierDiscord then
        if exports.discord_perms:IsRolePresent(src, roleNeeded) then
            deferrals.done()
            allowed = true
        else
            deferrals.done(notWhitelisted)
        end
    else
        deferrals.done(noDiscord)
    end
end)