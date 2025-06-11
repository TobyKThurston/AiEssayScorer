import { Ratelimit } from '@upstash/ratelimit';
import { Redis }     from '@upstash/redis';

// 30 requests per 1 minute (sliding window)
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, '1 m'),
  analytics: true,             // shows nice charts in Upstash UI
});
