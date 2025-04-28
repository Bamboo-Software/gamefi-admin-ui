export enum TaskTypeEnum {
    SOCIAL = 'social',
    REFERRAL = 'referral',
    GAME = 'game',
    ACHIEVEMENT = 'achievement',
    OTHER = 'other',
}

export enum SocialTaskTypeEnum {
    YOUTUBE_SUBSCRIBE = 'youtube_subscribe',
    YOUTUBE_WATCH = 'youtube_watch',
    YOUTUBE_LIKE = 'youtube_like',
    YOUTUBE_COMMENT = 'youtube_comment',
    TIKTOK_WATCH = 'tiktok_watch',
    TIKTOK_LIKE = 'tiktok_like',
    TIKTOK_COMMENT = 'tiktok_comment',
    TIKTOK_SHARE = 'tiktok_share',
    X_FOLLOW = 'x_follow',
    X_LIKE = 'x_like',
    X_COMMENT = 'x_comment',
    X_SHARE = 'x_share',
    FACEBOOK_LIKE = 'facebook_like',
    FACEBOOK_SHARE = 'facebook_share',
    INSTAGRAM_FOLLOW = 'instagram_follow',
    INSTAGRAM_LIKE = 'instagram_like',
    INSTAGRAM_COMMENT = 'instagram_comment',
    INSTAGRAM_SHARE = 'instagram_share',
    TELEGRAM_JOIN = 'telegram_join',
    VISIT_WEBSITE = 'visit_website',
  }
  export enum ReferralTaskTypeEnum {
    INVITE_1 = 'invite_1',
    INVITE_5 = 'invite_5',
    INVITE_10 = 'invite_10',
    INVITE_20 = 'invite_20',
  }
  export enum GameTaskTypeEnum {
    SPIN_WHEEL = 'spin_wheel',
    INSTALL_APP = 'install_app',
    PLAY_FLAPPY_JFOX = 'play_flappy_jfox',
  }
  export enum AchievementTaskTypeEnum {
    DAILY_LOGIN_STREAK = 'daily_login_streak',
    POINT_MILESTONE_100000 = 'points_milestone_100000',
    POINT_MILESTONE_500000 = 'points_milestone_500000',
  }
  export enum OtherTaskTypeEnum {
    DAILY_CHECK_IN = 'daily_check_in',
    DAILY_SPIN_WHEEL = 'daily_spin_wheel',
    PHANTOM_CONNECT = 'phantom_connect',
  }
  export enum UserTaskStatusEnum {
    OPEN = 'open',
    PENDING = 'pending',
    READY_TO_CLAIM = 'ready_to_claim',
    COMPLETED = 'completed',
    EXPIRED = 'expired',
    FAILED = 'failed',
  }
  export enum TaskFrequencyEnum {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    PERMANENT = 'permanent',
  }