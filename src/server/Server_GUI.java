package server;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import java.net.ServerSocket;
import java.util.regex.Pattern;

public class Server_GUI extends Application   {
    //private int port_number;

    @Override
    public void start(Stage stage) throws Exception {
        Pane root = new Pane();
        root.setStyle("-fx-background-color: #7d93db");

        Scene scene = new Scene(root, 500, 450);
        scene.getStylesheets().add("Res/Stylesheet.css");


        stage.setTitle("ChatTalk Server ");
        stage.setScene(scene);
        Label portNumber = new Label("Port number: ");
        portNumber.setLayoutX(50);
        portNumber.setLayoutY(100);
        root.getChildren().add(portNumber);
        TextField portText= new TextField();
        portText.setLayoutX(120);
        portText.setLayoutY(97);
        root.getChildren().add(portText);

        Button login_button = new Button();
        login_button.setLayoutX(50);
        login_button.setLayoutY(250);
        login_button.setText("Start server");
        login_button.setPrefSize(225, 25);
        root.getChildren().add(login_button);
        Label response=new Label();
        root.getChildren().add(response);
        Label error_label = new Label("");
        error_label.setLayoutX(50);
        error_label.setLayoutY(150);
        root.getChildren().add(error_label);

        //Lambda Expression
        EventHandler<ActionEvent> event=(e)->{
            error_label.setText("");
            if(Pattern.matches("[0-9]{4}",portText.getText())) {
                int x = Integer.parseInt(portText.getText());
                response.setText("Started server");
                stage.hide();
                serverconnect(x);
            }
            else
                error_label.setText("Invalid port number");

        };
        login_button.setOnAction(event);
        stage.show();
    }
    public static void serverconnect(int x)
    {
        ServerSocket serverx=null;
        try {
            serverx = new ServerSocket(x);
        }
        catch(Exception ex)
        {
        }
        try{
            while (true) {
                Server.ServerHandler newConnection = new Server.ServerHandler(serverx.accept());
                newConnection.start();
            }
        }
        catch(Exception ex3)
        {
        }
        finally {
            try{
                serverx.close();
            }
            catch(Exception ex2)
            {
            }
        }
    }
    public static void main(String[] args)
    {
        launch(args);
    }
}