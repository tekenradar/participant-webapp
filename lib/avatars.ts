export const avatars = [
    { avatarId: 'default', url: '/static/avatars/genderneutraal.svg' },
    { avatarId: 'architect', url: '/static/avatars/architect.svg' },
    { avatarId: 'baby', url: '/static/avatars/baby.svg' },
    { avatarId: 'man_torso', url: '/static/avatars/man_torso.svg' },
    { avatarId: 'zakenman', url: '/static/avatars/zakenman.svg' },
    { avatarId: 'vrouw_torso', url: '/static/avatars/vrouw_torso.svg' },
    { avatarId: 'vrouw_met_hoofdoek', url: '/static/avatars/vrouw_met_hoofddoek.svg' },
    { avatarId: 'zakenvrouw', url: '/static/avatars/zakenvrouw.svg' },
    { avatarId: 'baby_torso', url: '/static/avatars/baby_torso.svg' },
    { avatarId: 'oude_vrouw_torso', url: '/static/avatars/oude_vrouw_torso.svg' },
]

export const getAvatarURL = (avatarId: string) => {
    return avatars.find(avatar => avatar.avatarId === avatarId)?.url || avatars[0].url;
}