import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '../components/Icon';
import { colors, radius, spacing } from '../constants/theme';

const { width } = Dimensions.get('window');

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.forest900, colors.forest800, '#1a4d3e']}
        style={styles.topBackground}
      />

      <SafeAreaView style={styles.safe} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo + Ilustração */}
            <View style={styles.hero}>
              <View style={styles.logoRow}>
                <View style={styles.logoMark}>
                  <Icon name="leaf" size={22} color={colors.white} />
                </View>
                <Text style={styles.logoText}>UniApp</Text>
              </View>

              <View style={styles.illustration}>
                <View style={styles.illusCircle}>
                  <Icon name="book" size={48} color={colors.forest900} />
                </View>
                <View style={[styles.floatingIcon, styles.floatLeaf]}>
                  <Icon name="leaf" size={20} color={colors.forest700} />
                </View>
                <View style={[styles.floatingIcon, styles.floatPeople]}>
                  <Icon name="people" size={20} color={colors.forest700} />
                </View>
              </View>
            </View>

            {/* Painel branco */}
            <View style={styles.panel}>
              <Text style={styles.eyebrow}>COMUNIDADE UNIVERSITÁRIA</Text>
              <Text style={styles.title}>Conecte-se.{'\n'}Compartilhe. Evolua.</Text>
              <Text style={styles.subtitle}>
                Sua comunidade universitária em um só lugar.
              </Text>

              {/* Formulário */}
              <View style={styles.form}>
                <View style={styles.field}>
                  <Text style={styles.label}>E-mail institucional</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="mail" size={18} color={colors.soft} />
                    <TextInput
                      style={styles.input}
                      placeholder="nome@suauniversidade.edu.br"
                      placeholderTextColor={colors.soft}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Senha</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="lock" size={18} color={colors.soft} />
                    <TextInput
                      style={styles.input}
                      placeholder="Digite sua senha"
                      placeholderTextColor={colors.soft}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Icon name="eye" size={18} color={colors.soft} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.optionsRow}>
                  <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setRemember(!remember)}
                  >
                    <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
                      {remember && <Icon name="check" size={12} color={colors.white} />}
                    </View>
                    <Text style={styles.checkboxLabel}>Lembrar de mim</Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Text style={styles.forgot}>Esqueci minha senha</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                  onPress={handleLogin}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <>
                      <Text style={styles.primaryButtonText}>Entrar</Text>
                      <Text style={styles.arrow}>→</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => setShowSignup(true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.secondaryButtonText}>Criar minha conta</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.note}>
                <Icon name="shield" size={15} color={colors.forest700} />
                <Text style={styles.noteText}>
                  Ambiente exclusivo para a comunidade universitária
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {showSignup && <SignupSheet onClose={() => setShowSignup(false)} />}
    </View>
  );
}

// ===== Sheet de Cadastro =====
function SignupSheet({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <View style={styles.sheetOverlay}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.grabber} />
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetKicker}>BEM-VINDO À COMUNIDADE</Text>
            <Text style={styles.sheetTitle}>Criar minha conta</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={20} color={colors.ink} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <Field label="Nome completo" placeholder="Como você quer ser chamado?" />
          <Field label="E-mail institucional" placeholder="nome@universidade.edu.br" keyboardType="email-address" />
          <View style={styles.twoFields}>
            <View style={{ flex: 1 }}>
              <Field label="Curso" placeholder="Ex.: ADS" />
            </View>
            <View style={{ flex: 1 }}>
              <Field label="Instituição" placeholder="Ex.: IFSP" />
            </View>
          </View>
          <Field label="Senha" placeholder="Mínimo de 8 caracteres" secureTextEntry />

          <View style={styles.privacy}>
            <Icon name="shield" size={14} color={colors.forest700} />
            <Text style={styles.privacyText}>
              Seus dados acadêmicos são usados apenas para validar sua participação.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setSent(true)}
            activeOpacity={0.85}
          >
            {sent ? (
              <>
                <Icon name="check" size={18} color={colors.white} />
                <Text style={styles.primaryButtonText}> Conta criada!</Text>
              </>
            ) : (
              <Text style={styles.primaryButtonText}>Continuar cadastro</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

function Field({
  label,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
}: {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, { paddingLeft: 14 }]}
          placeholder={placeholder}
          placeholderTextColor={colors.soft}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  hero: {
    paddingHorizontal: spacing.xl,
    paddingTop: 12,
    paddingBottom: 28,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 28,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  illustration: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    position: 'relative',
  },
  illusCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  floatingIcon: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  floatLeaf: {
    top: 8,
    right: width * 0.22,
  },
  floatPeople: {
    bottom: 4,
    left: width * 0.2,
  },
  panel: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.xl,
    paddingTop: 28,
    paddingBottom: 20,
    flex: 1,
    minHeight: 480,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.forest700,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.forest950,
    lineHeight: 32,
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 26,
    lineHeight: 20,
  },
  form: {
    gap: 4,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.ink,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mint50,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.ink,
    paddingVertical: 0,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.forest900,
    borderColor: colors.forest900,
  },
  checkboxLabel: {
    fontSize: 13,
    color: colors.muted,
  },
  forgot: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.forest700,
  },
  primaryButton: {
    backgroundColor: colors.forest900,
    height: 52,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  arrow: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  secondaryButtonText: {
    color: colors.forest900,
    fontSize: 15,
    fontWeight: '700',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    paddingVertical: 12,
  },
  noteText: {
    fontSize: 12,
    color: colors.muted,
  },
  sheetOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 36, 28, 0.45)',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.xl,
    paddingBottom: 20,
    maxHeight: '88%',
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sheetKicker: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: colors.forest700,
    marginBottom: 4,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.forest950,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.mint50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoFields: {
    flexDirection: 'row',
    gap: 12,
  },
  privacy: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.mint50,
    padding: 12,
    borderRadius: radius.md,
    marginBottom: 20,
    marginTop: 4,
  },
  privacyText: {
    flex: 1,
    fontSize: 12,
    color: colors.muted,
    lineHeight: 17,
  },
});