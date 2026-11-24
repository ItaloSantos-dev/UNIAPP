import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../components/Icon';
import { colors, radius, spacing } from '../constants/theme';

type Props = {
  onNavigate: (screen: 'market' | 'groups') => void;
  onLogout: () => void;
};

const reviews = [
  {
    name: 'Beatriz P.',
    initials: 'BP',
    time: 'há 2 dias',
    text: 'Material em ótimo estado e entrega rápida no campus. Super recomendo!',
  },
  {
    name: 'Carlos Eduardo',
    initials: 'CE',
    time: 'há 1 semana',
    text: 'Negociação transparente e pessoa muito atenciosa. Voltarei a comprar.',
  },
];

export default function ProfileScreen({ onNavigate, onLogout }: Props) {
  const [tab, setTab] = useState('Meus anúncios');

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header do perfil */}
          <View style={styles.profileHeader}>
            <Image
              source={{
                uri: '/assets/perfil.webp',
              }}
              style={styles.avatar}
            />
            <View style={styles.nameRow}>
              <Text style={styles.name}>João Silva</Text>
              <Icon name="shield" size={16} color={colors.forest700} />
            </View>
            <Text style={styles.course}>Análise e Desenvolvimento de Sistemas</Text>
            <Text style={styles.institution}>UNIFACEMA • 4º semestre</Text>

            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>Editar perfil</Text>
            </TouchableOpacity>
          </View>

          {/* Card de reputação */}
          <View style={styles.reputationCard}>
            <View style={styles.scoreRow}>
              <View>
                <Text style={styles.scoreNumber}>4,8</Text>
                <Text style={styles.scoreLabel}>de 5</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon key={i} name="star" size={16} color={colors.amber} filled={i <= 4} />
                  ))}
                </View>
                <Text style={styles.reviewsCount}>24 avaliações recebidas</Text>
              </View>
            </View>

            <View style={styles.metrics}>
              <View style={styles.metric}>
                <View style={styles.metricIcon}>
                  <Icon name="check" size={16} color={colors.forest700} />
                </View>
                <Text style={styles.metricNumber}>18</Text>
                <Text style={styles.metricLabel}>negociações</Text>
              </View>
              <View style={styles.metric}>
                <View style={styles.metricIcon}>
                  <Icon name="leaf" size={16} color={colors.forest700} />
                </View>
                <Text style={styles.metricNumber}>7</Text>
                <Text style={styles.metricLabel}>doações</Text>
              </View>
              <View style={styles.metric}>
                <View style={styles.metricIcon}>
                  <Icon name="people" size={16} color={colors.forest700} />
                </View>
                <Text style={styles.metricNumber}>5</Text>
                <Text style={styles.metricLabel}>grupos</Text>
              </View>
            </View>

            <View style={styles.reputationNote}>
              <Icon name="shield" size={14} color={colors.forest700} />
              <Text style={styles.reputationNoteText}>
                Sua reputação é construída por estudantes após interações concluídas.
              </Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {['Meus anúncios', 'Meus grupos', 'Avaliações'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.tab, tab === item && styles.tabActive]}
                onPress={() => setTab(item)}
              >
                <Text style={[styles.tabText, tab === item && styles.tabTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conteúdo das tabs */}
          {tab === 'Avaliações' ? (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Avaliações recentes</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>Ver todas</Text>
                </TouchableOpacity>
              </View>
              {reviews.map((review) => (
                <View key={review.name} style={styles.reviewCard}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewInitials}>{review.initials}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.reviewLine}>
                      <Text style={styles.reviewName}>{review.name}</Text>
                      <Text style={styles.reviewTime}>{review.time}</Text>
                    </View>
                    <View style={styles.stars}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Icon key={i} name="star" size={12} color={colors.amber} filled />
                      ))}
                    </View>
                    <Text style={styles.reviewText}>“{review.text}”</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : tab === 'Meus anúncios' ? (
            <View style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <Icon name="tag" size={20} color={colors.forest700} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>4 anúncios ativos</Text>
                <Text style={styles.activityText}>2 vendidos • 1 doado neste mês</Text>
              </View>
              <Icon name="chevron" size={18} color={colors.soft} />
            </View>
          ) : (
            <View style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <Icon name="people" size={20} color={colors.forest700} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>5 grupos de estudo</Text>
                <Text style={styles.activityText}>2 encontros programados esta semana</Text>
              </View>
              <Icon name="chevron" size={18} color={colors.soft} />
            </View>
          )}

          {/* Botão Sair */}
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Icon name="logout" size={18} color="#e05c5c" />
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>

          <View style={{ height: 110 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('market')}>
          <Icon name="home" size={22} color={colors.soft} />
          <Text style={styles.navLabel}>Início</Text>
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

        <TouchableOpacity style={styles.navItem}>
          <Icon name="user" size={22} color={colors.forest900} filled />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Perfil</Text>
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
  safe: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: spacing.xl,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.forest950,
  },
  course: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },
  institution: {
    fontSize: 13,
    color: colors.soft,
    marginTop: 2,
    marginBottom: 14,
  },
  editBtn: {
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.forest900,
  },
  reputationCard: {
    marginHorizontal: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 18,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.forest900,
  },
  scoreLabel: {
    fontSize: 13,
    color: colors.muted,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
  },
  reviewsCount: {
    fontSize: 12,
    color: colors.muted,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.mint100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  metricNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.ink,
  },
  metricLabel: {
    fontSize: 11,
    color: colors.muted,
  },
  reputationNote: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.mint50,
    padding: 10,
    borderRadius: 10,
  },
  reputationNoteText: {
    flex: 1,
    fontSize: 11,
    color: colors.muted,
    lineHeight: 15,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: spacing.xl,
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.line,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 9,
  },
  tabActive: {
    backgroundColor: colors.forest900,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  tabTextActive: {
    color: colors.white,
  },
  section: {
    paddingHorizontal: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.forest950,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.forest700,
  },
  reviewCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mint100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewInitials: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.forest700,
  },
  reviewLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
  reviewTime: {
    fontSize: 11,
    color: colors.soft,
  },
  reviewText: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 6,
    lineHeight: 18,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.mint100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
  },
  activityText: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: spacing.xl,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e05c5c',
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