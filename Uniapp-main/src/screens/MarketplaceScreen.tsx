import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '../components/Icon';
import { colors, radius, spacing } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;

type Props = {
  onNavigate: (screen: 'groups' | 'profile') => void;
  onLogout: () => void;
};

const products = [
  {
    id: '1',
    title: 'Lógica de Programação',
    meta: 'ADS • Livros',
    price: 'R$ 35,00',
    condition: 'Bom estado',
    badge: '',
    seller: 'Marina S.',
    rating: '4,9',
    image: 'https://images.unsplash.com/photo-1564609116494-380be7238d7d?auto=format&fit=crop&w=500&q=82',
  },
  {
    id: '2',
    title: 'Calculadora científica',
    meta: 'Engenharias',
    price: 'R$ 45,00',
    condition: 'Muito bom',
    badge: 'TROCA',
    seller: 'Lucas A.',
    rating: '4,7',
    image: 'https://images.unsplash.com/photo-1516201580490-33550d32de5c?auto=format&fit=crop&w=500&q=82',
  },
  {
    id: '3',
    title: 'Apostila de Matemática',
    meta: 'Cálculo I',
    price: 'Grátis',
    condition: 'Boa conservação',
    badge: 'GRÁTIS',
    seller: 'Ana Clara',
    rating: '5,0',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=82',
  },
  {
    id: '4',
    title: 'Kit desenho técnico',
    meta: 'Arquitetura',
    price: 'R$ 28,00',
    condition: 'Bom estado',
    badge: '',
    seller: 'Rafael M.',
    rating: '4,8',
    image: 'https://images.unsplash.com/photo-1685038955804-3de172e7ff35?auto=format&fit=crop&w=500&q=82',
  },
];

const categories = ['Todos', 'Livros', 'Calculadoras', 'Laboratório', 'Apostilas', 'Outros'];

export default function MarketplaceScreen({ onNavigate, onLogout }: Props) {
  const [category, setCategory] = useState('Todos');
  const [favorites, setFavorites] = useState<string[]>(['3']);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header verde */}
      <LinearGradient
        colors={[colors.forest900, colors.forest800]}
        style={styles.header}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.topRow}>
            <View>
              <View style={styles.logoRow}>
                <View style={styles.logoMark}>
                  <Icon name="leaf" size={16} color={colors.white} />
                </View>
                <Text style={styles.logoText}>UniApp</Text>
              </View>
              <Text style={styles.greeting}>Olá, estudante!</Text>
            </View>

            <TouchableOpacity style={styles.bellButton}>
              <Icon name="bell" size={20} color={colors.white} />
              <View style={styles.dot} />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            <Icon name="search" size={18} color={colors.soft} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar livros, calculadoras, materiais..."
              placeholderTextColor={colors.soft}
            />
            <TouchableOpacity style={styles.filterIcon}>
              <Icon name="filter" size={18} color={colors.forest700} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categorias */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.categoryChip, category === item && styles.categoryActive]}
              onPress={() => setCategory(item)}
            >
              <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filtros */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterBtn}>
            <Icon name="filter" size={14} color={colors.muted} />
            <Text style={styles.filterText}>Filtros</Text>
            <View style={styles.filterCount}>
              <Text style={styles.filterCountText}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Mais recentes</Text>
            <Text style={{ color: colors.muted, fontSize: 12 }}>⌄</Text>
          </TouchableOpacity>
        </View>

        {/* Título da seção */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.eyebrow}>PERTO DE VOCÊ</Text>
            <Text style={styles.sectionTitle}>Materiais em destaque</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* Grid de produtos */}
        <View style={styles.grid}>
          {products.map((product) => (
            <View key={product.id} style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                {product.badge ? (
                  <View
                    style={[
                      styles.badge,
                      product.badge === 'TROCA' && styles.badgeBlue,
                      product.badge === 'GRÁTIS' && styles.badgeGreen,
                    ]}
                  >
                    <Text style={styles.badgeText}>{product.badge}</Text>
                  </View>
                ) : null}
                <TouchableOpacity
                  style={styles.favoriteBtn}
                  onPress={() => toggleFavorite(product.id)}
                >
                  <Icon
                    name="heart"
                    size={16}
                    color={favorites.includes(product.id) ? '#e05c5c' : colors.soft}
                    filled={favorites.includes(product.id)}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {product.title}
                </Text>
                <Text style={styles.productMeta}>{product.meta}</Text>
                <Text
                  style={[
                    styles.price,
                    product.price === 'Grátis' && styles.freePrice,
                  ]}
                >
                  {product.price}
                </Text>

                <View style={styles.sellerRow}>
                  <View style={styles.sellerAvatar}>
                    <Text style={styles.sellerInitial}>{product.seller.charAt(0)}</Text>
                  </View>
                  <Text style={styles.sellerName} numberOfLines={1}>
                    {product.seller}
                  </Text>
                  <View style={styles.rating}>
                    <Icon name="star" size={11} color={colors.amber} filled />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Banner sustentabilidade */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Icon name="leaf" size={22} color={colors.forest700} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Compartilhar transforma</Text>
            <Text style={styles.bannerText}>Você já ajudou a economizar 4,2 kg de materiais.</Text>
          </View>
          <Icon name="chevron" size={18} color={colors.soft} />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <Icon name="plus" size={20} color={colors.white} />
        <Text style={styles.fabText}>Anunciar</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={22} color={colors.forest900} filled />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navPublish}>
            <Icon name="plus" size={22} color={colors.white} />
          </View>
          <Text style={styles.navLabel}>Anunciar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('groups')}>
          <Icon name="people" size={22} color={colors.soft} />
          <Text style={styles.navLabel}>Grupos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('profile')}>
          <Icon name="user" size={22} color={colors.soft} />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  header: {
    paddingBottom: 18,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 8,
    paddingBottom: 14,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoMark: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  greeting: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 36,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.amber,
    borderWidth: 1.5,
    borderColor: colors.forest900,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.xl,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    gap: 10,
    shadowColor: '#021811',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.ink,
    paddingVertical: 0,
  },
  filterIcon: {
    borderLeftWidth: 1,
    borderLeftColor: colors.line,
    paddingLeft: 12,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 18,
  },
  categories: {
    paddingHorizontal: spacing.xl,
    gap: 8,
    paddingBottom: 4,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  categoryActive: {
    backgroundColor: colors.forest900,
    borderColor: colors.forest900,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  categoryTextActive: {
    color: colors.white,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginTop: 14,
    marginBottom: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  filterCount: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.mint100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.forest700,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.xl,
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: colors.forest700,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.forest950,
    marginTop: 2,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.forest700,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.xl,
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
  },
  imageWrapper: {
    height: 120,
    backgroundColor: colors.mint50,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: colors.forest900,
  },
  badgeBlue: {
    backgroundColor: '#2b6cb0',
  },
  badgeGreen: {
    backgroundColor: '#1e8a5e',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    padding: 12,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.ink,
    lineHeight: 17,
    marginBottom: 2,
  },
  productMeta: {
    fontSize: 11,
    color: colors.soft,
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.forest900,
    marginBottom: 8,
  },
  freePrice: {
    color: '#1e8a5e',
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.mint100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerInitial: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.forest700,
  },
  sellerName: {
    flex: 1,
    fontSize: 11,
    color: colors.muted,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.muted,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  bannerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.mint100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
  bannerText: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: colors.forest900,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    height: 48,
    borderRadius: 24,
    gap: 6,
    shadowColor: colors.forest900,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fabText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 8,
    paddingBottom: 22,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  navPublish: {
    width: 42,
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.forest900,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.soft,
  },
  navLabelActive: {
    color: colors.forest900,
  },
});