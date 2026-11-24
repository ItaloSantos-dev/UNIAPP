import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import { JSX } from 'react/jsx-runtime';

type IconName =
  | 'arrow' | 'bell' | 'book' | 'calendar' | 'camera' | 'check' | 'chevron'
  | 'clock' | 'close' | 'eye' | 'filter' | 'heart' | 'home' | 'leaf'
  | 'location' | 'lock' | 'logout' | 'mail' | 'message' | 'more' | 'people'
  | 'plus' | 'search' | 'settings' | 'shield' | 'star' | 'tag' | 'user';

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  filled?: boolean;
}

export function Icon({ name, size = 20, color = colors.ink, filled = false }: Props) {
  const map: Record<IconName, JSX.Element> = {
    arrow: <Ionicons name="chevron-back" size={size} color={color} />,
    bell: <Ionicons name="notifications-outline" size={size} color={color} />,
    book: <Ionicons name="book-outline" size={size} color={color} />,
    calendar: <Ionicons name="calendar-outline" size={size} color={color} />,
    camera: <Ionicons name="camera-outline" size={size} color={color} />,
    check: <Ionicons name="checkmark" size={size} color={color} />,
    chevron: <Ionicons name="chevron-forward" size={size} color={color} />,
    clock: <Ionicons name="time-outline" size={size} color={color} />,
    close: <Ionicons name="close" size={size} color={color} />,
    eye: <Ionicons name="eye-outline" size={size} color={color} />,
    filter: <Ionicons name="options-outline" size={size} color={color} />,
    heart: <Ionicons name={filled ? 'heart' : 'heart-outline'} size={size} color={color} />,
    home: <Ionicons name={filled ? 'home' : 'home-outline'} size={size} color={color} />,
    leaf: <MaterialCommunityIcons name="leaf" size={size} color={color} />,
    location: <Ionicons name="location-outline" size={size} color={color} />,
    lock: <Ionicons name="lock-closed-outline" size={size} color={color} />,
    logout: <Ionicons name="log-out-outline" size={size} color={color} />,
    mail: <Ionicons name="mail-outline" size={size} color={color} />,
    message: <Ionicons name="chatbubble-outline" size={size} color={color} />,
    more: <Ionicons name="ellipsis-horizontal" size={size} color={color} />,
    people: <Ionicons name="people-outline" size={size} color={color} />,
    plus: <Ionicons name="add" size={size} color={color} />,
    search: <Ionicons name="search" size={size} color={color} />,
    settings: <Ionicons name="settings-outline" size={size} color={color} />,
    shield: <Ionicons name="shield-checkmark-outline" size={size} color={color} />,
    star: <Ionicons name={filled ? 'star' : 'star-outline'} size={size} color={color} />,
    tag: <Ionicons name="pricetag-outline" size={size} color={color} />,
    user: <Ionicons name={filled ? 'person' : 'person-outline'} size={size} color={color} />,
  };

  return map[name];
}