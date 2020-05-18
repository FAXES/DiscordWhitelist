----------------------------------------
--- Discord Whitelist, Made by FAXES ---
----------------------------------------

-- Documentation: https://docs.faxes.zone/docs/discord-whitelist-setup
--- Config ---
notWhitelistedMessage = "You are not whitelisted for this server." -- Message displayed when they are not whitelist with the role

whitelistRoles = { -- Role nickname(s) needed to pass the whitelist
    "DISCORD_ROLE_ID",
    "DISCORD_ROLE_ID",
    "DISCORD_ROLE_ID",
}

--- Code ---

AddEventHandler("playerConnecting", function(name, setCallback, deferrals)
    local src = source
    local passAuth = false
    deferrals.defer()
    deferrals.update("Checking Permissions...")

    for k, v in ipairs(GetPlayerIdentifiers(src)) do
        if string.sub(v, 1, string.len("discord:")) == "discord:" then
            identifierDiscord = v
        end
    end

    if identifierDiscord then
        usersRoles = exports.discord_perms:GetRoles(src)
        local function has_value(table, val)
            for index, value in ipairs(table) do
                if value == val then
                    return true
                end
            end
            return false
        end
        for index, valueReq in ipairs(whitelistRoles) do 
            if has_value(usersRoles, valueReq) then
                passAuth = true
            end
            if next(whitelistRoles,index) == nil then
                if passAuth == true then
                    deferrals.done()
                else
                    deferrals.done(notWhitelistedMessage)
                end
            end
        end
    else
        deferrals.done("Discord was not detected. Please make sure Discord is running and installed. If it is make sure it's not Discord PTB. See the below link for a debugging process. docs.faxes.zone/docs/debugging-discord")
    end
end)