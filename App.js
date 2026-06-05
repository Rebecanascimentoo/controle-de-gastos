import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

export default function App() {
  const [tela, setTela] = useState("Login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [gastos, setGastos] = useState([
    {
      id: 1,
      descricao: "Mercado",
      valor: 120.5,
      categoria: "Alimentação",
      data: "05/06/2026",
    },
    {
      id: 2,
      descricao: "Ônibus",
      valor: 8.5,
      categoria: "Transporte",
      data: "05/06/2026",
    },
  ]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("Alimentação");
  const [gastoEditando, setGastoEditando] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

  const categorias = [
    "Alimentação",
    "Transporte",
    "Lazer",
    "Saúde",
    "Educação",
    "Outros",
  ];

  const totalGasto = gastos.reduce((total, item) => total + item.valor, 0);

  function fazerLogin() {
    if (email.trim() === "" || senha.trim() === "") {
      Alert.alert("Atenção", "Digite e-mail e senha para entrar.");
      return;
    }

    setTela("Dashboard");
  }

  function salvarGasto() {
    if (descricao.trim() === "" || valor.trim() === "") {
      Alert.alert("Atenção", "Preencha a descrição e o valor do gasto.");
      return;
    }

    const valorConvertido = parseFloat(valor.replace(",", "."));

    if (isNaN(valorConvertido) || valorConvertido <= 0) {
      Alert.alert("Atenção", "Digite um valor válido.");
      return;
    }

    if (gastoEditando) {
      const listaAtualizada = gastos.map((item) =>
        item.id === gastoEditando.id
          ? {
              ...item,
              descricao,
              valor: valorConvertido,
              categoria,
            }
          : item
      );

      setGastos(listaAtualizada);
      setGastoEditando(null);
      Alert.alert("Sucesso", "Gasto editado com sucesso!");
    } else {
      const novoGasto = {
        id: Date.now(),
        descricao,
        valor: valorConvertido,
        categoria,
        data: "05/06/2026",
      };

      setGastos([...gastos, novoGasto]);
      Alert.alert("Sucesso", "Gasto cadastrado com sucesso!");
    }

    setDescricao("");
    setValor("");
    setCategoria("Alimentação");
    setTela("Dashboard");
  }

  function editarGasto(gasto) {
    setGastoEditando(gasto);
    setDescricao(gasto.descricao);
    setValor(String(gasto.valor));
    setCategoria(gasto.categoria);
    setTela("Adicionar Gasto");
  }

  function excluirGasto(id) {
    const novaLista = gastos.filter((item) => item.id !== id);
    setGastos(novaLista);
    Alert.alert("Pronto", "Gasto excluído com sucesso!");
  }

  function Header() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💰 Controle de Gastos</Text>
        <Text style={styles.headerSubtitle}>Organize sua vida financeira</Text>
      </View>
    );
  }

  function Menu() {
    return (
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setTela("Dashboard")}>
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => setTela("Adicionar Gasto")}>
          <Text style={styles.menuText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => setTela("Relatórios")}>
          <Text style={styles.menuText}>Relatórios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => setTela("Categorias")}>
          <Text style={styles.menuText}>Categorias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => setTela("Perfil")}>
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function TelaLogin() {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginIcon}>💰</Text>
        <Text style={styles.loginTitle}>Controle de Gastos</Text>
        <Text style={styles.loginSubtitle}>Acesse sua conta para controlar suas despesas</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={fazerLogin}>
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        
      </View>
    );
  }

  function TelaDashboard() {
    return (
      <ScrollView style={styles.container}>
        <Header />

        <View style={styles.cardTotal}>
          <Text style={styles.cardLabel}>Total gasto</Text>
          <Text style={styles.cardValue}>R$ {totalGasto.toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.smallCardNumber}>{gastos.length}</Text>
            <Text style={styles.smallCardText}>Despesas</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.smallCardNumber}>{categorias.length}</Text>
            <Text style={styles.smallCardText}>Categorias</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => setTela("Adicionar Gasto")}>
          <Text style={styles.primaryButtonText}>+ Adicionar novo gasto</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Últimos gastos</Text>

        {gastos.map((item) => (
          <View key={item.id} style={styles.expenseCard}>
            <View>
              <Text style={styles.expenseTitle}>{item.descricao}</Text>
              <Text style={styles.expenseInfo}>{item.categoria} • {item.data}</Text>
              <Text style={styles.expenseValue}>R$ {item.valor.toFixed(2)}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton} onPress={() => editarGasto(item)}>
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => excluirGasto(item.id)}>
                <Text style={styles.actionText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Menu />
      </ScrollView>
    );
  }

  function TelaAdicionarGasto() {
    return (
      <ScrollView style={styles.container}>
        <Header />

        <Text style={styles.pageTitle}>
          {gastoEditando ? "Editar Gasto" : "Adicionar Gasto"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Descrição do gasto"
          value={descricao}
          onChangeText={setDescricao}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor do gasto"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />

        <Text style={styles.sectionTitle}>Escolha a categoria</Text>

        <View style={styles.categoryContainer}>
          {categorias.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoryButton,
                categoria === item && styles.categoryButtonSelected,
              ]}
              onPress={() => setCategoria(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  categoria === item && styles.categoryTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={salvarGasto}>
          <Text style={styles.primaryButtonText}>
            {gastoEditando ? "Salvar alterações" : "Cadastrar gasto"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            setGastoEditando(null);
            setDescricao("");
            setValor("");
            setCategoria("Alimentação");
            setTela("Dashboard");
          }}
        >
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <Menu />
      </ScrollView>
    );
  }

  function TelaRelatorios() {
    const maiorGasto = gastos.length > 0 ? Math.max(...gastos.map((item) => item.valor)) : 0;

    return (
      <ScrollView style={styles.container}>
        <Header />

        <Text style={styles.pageTitle}>Relatórios</Text>

        <View style={styles.cardTotal}>
          <Text style={styles.cardLabel}>Total geral de despesas</Text>
          <Text style={styles.cardValue}>R$ {totalGasto.toFixed(2)}</Text>
        </View>

        <View style={styles.reportCard}>
          <Text style={styles.reportText}>Quantidade de gastos: {gastos.length}</Text>
          <Text style={styles.reportText}>Maior gasto: R$ {maiorGasto.toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Histórico de despesas</Text>

        {gastos.map((item) => (
          <View key={item.id} style={styles.simpleItem}>
            <Text style={styles.expenseTitle}>{item.descricao}</Text>
            <Text style={styles.expenseInfo}>
              {item.categoria} - R$ {item.valor.toFixed(2)}
            </Text>
          </View>
        ))}

        <Menu />
      </ScrollView>
    );
  }

  function TelaCategorias() {
    const gastosFiltrados =
      categoriaFiltro === "Todas"
        ? gastos
        : gastos.filter((item) => item.categoria === categoriaFiltro);

    const totalFiltrado = gastosFiltrados.reduce((total, item) => total + item.valor, 0);

    return (
      <ScrollView style={styles.container}>
        <Header />

        <Text style={styles.pageTitle}>Categorias</Text>
        <Text style={styles.sectionTitle}>Filtrar por categoria</Text>

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              categoriaFiltro === "Todas" && styles.categoryButtonSelected,
            ]}
            onPress={() => setCategoriaFiltro("Todas")}
          >
            <Text
              style={[
                styles.categoryText,
                categoriaFiltro === "Todas" && styles.categoryTextSelected,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          {categorias.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoryButton,
                categoriaFiltro === item && styles.categoryButtonSelected,
              ]}
              onPress={() => setCategoriaFiltro(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  categoriaFiltro === item && styles.categoryTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cardTotal}>
          <Text style={styles.cardLabel}>Total filtrado</Text>
          <Text style={styles.cardValue}>R$ {totalFiltrado.toFixed(2)}</Text>
        </View>

        {gastosFiltrados.map((item) => (
          <View key={item.id} style={styles.simpleItem}>
            <Text style={styles.expenseTitle}>{item.descricao}</Text>
            <Text style={styles.expenseInfo}>
              {item.categoria} - R$ {item.valor.toFixed(2)}
            </Text>
          </View>
        ))}

        <Menu />
      </ScrollView>
    );
  }

  function TelaPerfil() {
    return (
      <ScrollView style={styles.container}>
        <Header />

        <Text style={styles.pageTitle}>Perfil</Text>

        <View style={styles.profileCard}>
          <Text style={styles.profileIcon}>👤</Text>
          <Text style={styles.profileName}>Rebeca Rodrigues do Nascimento</Text>
          <Text style={styles.profileInfo}>Matrícula: 01852646</Text>
          <Text style={styles.profileInfo}>Curso: Sistemas de Informação</Text>
          <Text style={styles.profileInfo}>Projeto: Controle de Gastos</Text>
          <Text style={styles.profileInfo}>E-mail: {email}</Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButtonLarge}
          onPress={() => {
            setEmail("");
            setSenha("");
            setTela("Login");
          }}
        >
          <Text style={styles.primaryButtonText}>Sair da conta</Text>
        </TouchableOpacity>

        <Menu />
      </ScrollView>
    );
  }

  if (tela === "Login") {
    return <TelaLogin />;
  }

  if (tela === "Dashboard") {
    return <TelaDashboard />;
  }

  if (tela === "Adicionar Gasto") {
    return <TelaAdicionarGasto />;
  }

  if (tela === "Relatórios") {
    return <TelaRelatorios />;
  }

  if (tela === "Categorias") {
    return <TelaCategorias />;
  }

  if (tela === "Perfil") {
    return <TelaPerfil />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    justifyContent: "center",
    padding: 25,
  },
  loginIcon: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 10,
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E3A5F",
  },
  loginSubtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#607080",
    marginBottom: 30,
  },
  header: {
    backgroundColor: "#1E3A5F",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#D6E4F0",
    fontSize: 14,
    marginTop: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#1E88E5",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#1E88E5",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: "#1E88E5",
    fontSize: 16,
    fontWeight: "bold",
  },
  tip: {
    textAlign: "center",
    color: "#607080",
    marginTop: 15,
  },
  cardTotal: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    borderLeftWidth: 6,
    borderLeftColor: "#1E88E5",
  },
  cardLabel: {
    fontSize: 15,
    color: "#607080",
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallCard: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 15,
  },
  smallCardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E88E5",
  },
  smallCardText: {
    color: "#607080",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginTop: 15,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginBottom: 15,
  },
  expenseCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
  },
  expenseTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E3A5F",
  },
  expenseInfo: {
    color: "#607080",
    marginTop: 4,
  },
  expenseValue: {
    color: "#1E88E5",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    marginTop: 12,
  },
  editButton: {
    backgroundColor: "#43A047",
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 10,
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2EC",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonSelected: {
    backgroundColor: "#1E88E5",
    borderColor: "#1E88E5",
  },
  categoryText: {
    color: "#1E3A5F",
    fontWeight: "bold",
  },
  categoryTextSelected: {
    color: "#FFFFFF",
  },
  reportCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
  },
  reportText: {
    fontSize: 16,
    color: "#1E3A5F",
    marginBottom: 8,
  },
  simpleItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20,
  },
  profileIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3A5F",
    textAlign: "center",
    marginBottom: 10,
  },
  profileInfo: {
    color: "#607080",
    marginTop: 5,
    textAlign: "center",
  },
  deleteButtonLarge: {
    backgroundColor: "#E53935",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  menu: {
    marginTop: 20,
    marginBottom: 40,
  },
  menuButton: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 5,
    borderLeftColor: "#1E88E5",
  },
  menuText: {
    color: "#1E3A5F",
    fontWeight: "bold",
    fontSize: 15,
  },
});