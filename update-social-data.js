const fs = require('fs');
const dataFile = 'js/premium-data.js';
let content = fs.readFileSync(dataFile, 'utf8');

const socialData = {
  1231: {
    description: 'Instagram Growth Services\\nPremium Instagram engagement for profiles, posts, Reels, and videos with fast automated processing.\\n\\nSERVICE FEATURES\\n• Choose between views, likes, and followers.\\n• Flexible quantities with clear minimum and maximum limits.\\n• Fast start and high delivery capacity.\\n\\nQUALITY & DELIVERY\\n• Services are selected for strong value, stability, and reliable performance.\\n• Orders are sent automatically after payment.\\n• A valid public Instagram link is required.\\n• Keep the profile, post, Reel, or video public until delivery is complete.\\n\\nSUPPORT\\n• Support is available for order-related issues.',
    variants: [{name: 'Views', priceText: 'ARS 1.040', desc: 'Reels and videos · Non-drop'}, {name: 'Likes', priceText: 'ARS 1.040', desc: 'Real accounts · Low drop'}, {name: 'Followers', priceText: 'ARS 1.040', desc: 'Accounts with posts · Non-drop'}]
  },
  1232: {
    description: 'TikTok Growth Services\\nHigh-quality TikTok engagement for videos and profiles, processed automatically after payment.\\n\\nSERVICE FEATURES\\n• Choose between video views, likes, and followers.\\n• Fast start with scalable delivery speeds.\\n• Real or high-quality accounts where stated.\\n\\nQUALITY & DELIVERY\\n• Selected for reliability, speed, and competitive value.\\n• Enter the correct public TikTok video or profile link.\\n• Keep the content and account public during delivery.\\n• Do not place another order for the same link until the first one is complete.\\n\\nSUPPORT\\n• Support is available for functional order issues.',
    variants: [{name: 'Views', priceText: 'ARS 1.040', desc: 'Fast start · Low drop · Up to 10M/day'}, {name: 'Likes', priceText: 'ARS 1.040', desc: 'HQ accounts · Instant start'}, {name: 'Followers', priceText: 'ARS 1.040', desc: 'Real accounts · Very low drop'}]
  },
  1233: {
    description: 'X / Twitter Growth Services\\nProfessional engagement for X profiles, posts, and videos with fast automatic processing.\\n\\nSERVICE FEATURES\\n• Choose between views, likes, and followers.\\n• Compatible with posts and video content where stated.\\n• Real or high-quality profiles are used for follower and like services.\\n\\nQUALITY & DELIVERY\\n• Selected for speed, stability, and strong value.\\n• Enter the correct public post, video, or profile URL.\\n• Keep the account and content public until completion.\\n• Avoid changing usernames or deleting content during delivery.\\n\\nSUPPORT\\n• Support is available for functional order issues.',
    variants: [{name: 'Views', priceText: 'ARS 1.300', desc: 'Posts and videos · Instant start'}, {name: 'Likes', priceText: 'ARS 1.300', desc: 'HQ accounts · Low drop'}, {name: 'Followers', priceText: 'ARS 1.300', desc: 'Real profiles · Low drop'}]
  },
  1234: {
    description: 'Facebook Growth Services\\nHigh-quality Facebook engagement for profiles, pages, and Reels with automatic processing.\\n\\nSERVICE FEATURES\\n• Choose between Reel views and followers.\\n• Compatible with Facebook profiles and pages where stated.\\n• Flexible quantities for different campaign sizes.\\n\\nQUALITY & DELIVERY\\n• Selected for reliability, speed, and competitive pricing.\\n• Enter the correct public profile, page, or Reel URL.\\n• Keep the destination public during delivery.\\n• Do not delete or restrict the content before completion.\\n\\nSUPPORT\\n• Support is available for functional order issues.',
    variants: [{name: 'Reels Views', priceText: 'ARS 1.040', desc: 'High quality · Fast delivery'}, {name: 'Followers', priceText: 'ARS 1.040', desc: 'Profiles and pages · HQ accounts'}]
  },
  1235: {
    description: 'YouTube Growth Services\\nReliable YouTube engagement for videos, Shorts, and channels with automatic order processing.\\n\\nSERVICE FEATURES\\n• Choose between views, likes, and subscribers.\\n• Suitable for videos, Shorts, and channel growth.\\n• Flexible quantities for small and large campaigns.\\n\\nQUALITY & DELIVERY\\n• Selected for stable performance and competitive pricing.\\n• Enter the correct public video, Short, or channel URL.\\n• Keep the content public and do not change the URL during delivery.\\n• Delivery speed may vary depending on order size and platform activity.\\n\\nSUPPORT\\n• Support is available for order-related issues.',
    variants: [{name: 'Views', priceText: 'ARS 1.560', desc: 'Videos and Shorts · Non-drop'}, {name: 'Likes', priceText: 'ARS 1.560', desc: 'High-quality likes'}, {name: 'Subscribers', priceText: 'ARS 7.800', desc: 'Non-drop · Instant start'}]
  },
  1236: {
    description: 'Telegram Growth Services\\nFast Telegram engagement for channels, groups, and posts with automatic delivery.\\n\\nSERVICE FEATURES\\n• Choose between channel or group members and post views.\\n• Fast start and high delivery capacity.\\n• View services are designed for the latest eligible post.\\n\\nQUALITY & DELIVERY\\n• Selected for reliable performance and competitive value.\\n• Enter a valid public Telegram channel, group, or post link.\\n• Keep the destination accessible until delivery is complete.\\n• Private or expired invite links may prevent delivery.\\n\\nSUPPORT\\n• Support is available for order-related issues.',
    variants: [{name: 'Members', priceText: 'ARS 1.040', desc: 'Non-drop members · Instant start'}, {name: 'Views', priceText: 'ARS 1.040', desc: 'Latest post only · Super-fast start'}]
  },
  1237: {
    description: 'Spotify Growth Services\\nPremium Spotify promotion for artists, tracks, playlists, albums, and user profiles.\\n\\nSERVICE FEATURES\\n• Choose between followers and USA premium plays.\\n• Supports eligible artists, users, playlists, tracks, and albums.\\n• Fast start with scalable delivery capacity.\\n\\nQUALITY & DELIVERY\\n• Selected for stable performance and strong value.\\n• Enter the exact public Spotify URL for the selected destination.\\n• Keep the track, artist, playlist, album, or profile available during delivery.\\n• Delivery speed may vary according to campaign size.\\n\\nSUPPORT\\n• Support is available for order-related issues.',
    variants: [{name: 'Followers', priceText: 'ARS 1.300', desc: 'Artists, users, and playlists'}, {name: 'USA Plays', priceText: 'ARS 1.300', desc: 'Premium USA plays · Tracks, artists, playlists, and albums'}]
  }
};

for (const id in socialData) {
  const productData = socialData[id];
  const regex = new RegExp(`({ id: ${id}.*?)}`, 'g');
  content = content.replace(regex, (match, p1) => {
    return p1 + `, description: ${JSON.stringify(productData.description)}, variants: ${JSON.stringify(productData.variants)} }`;
  });
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Updated premium-data.js with social boost descriptions and variants.');
