import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../components/Icon';
import { colors, radius, spacing } from '../constants/theme';

type Props = {
  onNavigate: (screen: 'market' | 'profile') => void;
};

const groups = [
  {
    id: '1',
    title: 'Algoritmos sem Mistério',
    subject: 'Construção de Algoritmos',
    course: 'ADS',
    people: 4,
    mode: 'Online',
    when: 'Quintas, 19h',
    places: '2 vagas',
    color: 'mint',
    initials: ['MA', 'RL', 'JS'],
  },
  {
    id: '2',
    title: 'Matemática Computacional',
    subject: 'Revisão para provas',
    course: 'ADS e Engenharias',
    people: 6,
    mode: 'Presencial',
    when: 'Sábados, 10h',
    places: '1 vaga',
    color: 'amber',
    initials: ['AC', 'BP', 'LV'],
  },
  {
    id: '3',
    title: 'Banco de Dados na Prática',
    subject: 'SQL e modelagem',
    course: 'ADS',
    people: 3,
    mode: 'Online',
    when: 'Terças, 20h',
    places: '3 vagas',
    color: 'mint',
    initials: ['JT', 'CM'],
  },
];

export default function GroupsScreen({ onNavigate }: Props) {
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>CRESCER EM CONJUNTO</Text>
            <Text style={styles.title}>Apoio Acadêmico</Text>
            <Text style={styles.subtitle}>Aprender juntos fica mais fácil.</Text>
          </View>
          <TouchableOpacity style={styles.bellButton}>
            <Icon name="bell" size={20} color={colors.ink} />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Search */}
          <View style={styles.searchBox}>
            <Icon name="search" size={18} color={colors.soft} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar disciplina ou grupo de estudo"
              placeholderTextColor={colors.soft}
            />
          </View>

          {/* Categorias */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {['Todas', 'Meu curso', 'Online', 'Presencial'].map((item, index) => (
              <TouchableOpacity
                key={item}
                style={[styles.categoryChip, index === 0 && styles.categoryActive]}
              >
                <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Criar grupo */}
          <TouchableOpacity style={styles.createCard} activeOpacity={0.85}>
            <View style={styles.createIcon}>
              <Icon name="people" size={24} color={colors.forest700} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.createTitle}>Crie seu grupo de estudo</Text>
              <Text style={styles.createText}>Encontre colegas e compartilhe conhecimento.</Text>
            </View>
            <View style={styles.createPlus}>
              <Icon name="plus" size={18} color={colors.white} />
            </View>
          </TouchableOpacity>

          {/* Seção recomendados */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.eyebrow}>FEITO PARA VOCÊ</Text>
              <Text style={styles.sectionTitle}>Grupos recomendados</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de grupos */}
          {groups.map((group, index) => (
            <View key={group.id} style={styles.groupCard}>
              <View style={styles.groupTop}>
                <View
                  style={[
                    styles.groupSymbol,
                    group.color === 'amber' && styles.symbolAmber,
                  ]}
                >
                  <Icon
                    name={group.mode === 'Online' ? 'message' : 'book'}
                    size={20}
                    color={group.color === 'amber' ? '#b7791f' : colors.forest700}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  {index === 0 && (
                    <View style={styles.recommended}>
                      <Icon name="star" size={11} color={colors.amber} filled />
                      <Text style={styles.recommendedText}>RECOMENDADO</Text>
                    </View>
                  )}
                  <Text style={styles.groupTitle}>{group.title}</Text>
                  <Text style={styles.groupMeta}>
                    {group.subject} • {group.course}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon name="more" size={18} color={colors.soft} />
                </TouchableOpacity>
              </View>

              <View style={styles.groupData}>
                <View style={styles.dataItem}>
                  <Icon name="calendar" size={14} color={colors.soft} />
                  <Text style={styles.dataText}>{group.when}</Text>
                </View>
                <View style={styles.dataItem}>
                  <View
                    style={[
                      styles.modeDot,
                      group.mode === 'Online' && styles.modeOnline,
                    ]}
                  />
                  <Text style={styles.dataText}>{group.mode}</Text>
                </View>
              </View>

              <View style={styles.groupBottom}>
                <View style={styles.avatarStack}>
                  {group.initials.map((initial) => (
                    <View key={initial} style={styles.avatar}>
                      <Text style={styles.avatarText}>{initial}</Text>
                    </View>
                  ))}
                  {group.people > 3 && (
                    <View style={[styles.avatar, styles.avatarMore]}>
                      <Text style={styles.avatarText}>+{group.people - 3}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.places}>{group.places}</Text>
                <TouchableOpacity style={styles.detailBtn}>
                  <Text style={styles.detailBtnText}>Ver detalhes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={{ height: 100 }} />
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

        <TouchableOpacity style={styles.navItem}>
          <Icon name="people" size={22} color={colors.forest900} filled />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Grupos</Text>
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
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.xl,
    paddingTop: 8,
    paddingBottom: 16,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: colors.forest700,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.forest950,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
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
    borderColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.ink,
    paddingVertical: 0,
  },
  categories: {
    gap: 8,
    marginBottom: 18,
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
  createCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 22,
  },
  createIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.mint100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
  },
  createText: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  createPlus: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.forest900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
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
  groupCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  groupTop: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  groupSymbol: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.mint100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolAmber: {
    backgroundColor: '#fef3c7',
  },
  recommended: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.amber,
    letterSpacing: 0.5,
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
  },
  groupMeta: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  groupData: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 14,
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dataText: {
    fontSize: 12,
    color: colors.muted,
  },
  modeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#d69e2e',
  },
  modeOnline: {
    backgroundColor: '#38a169',
  },
  groupBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarStack: {
    flexDirection: 'row',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.mint100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -6,
    borderWidth: 2,
    borderColor: colors.white,
  },
  avatarMore: {
    backgroundColor: colors.forest900,
  },
  avatarText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.forest700,
  },
  places: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.forest700,
  },
  detailBtn: {
    backgroundColor: colors.mint50,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  detailBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.forest900,
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