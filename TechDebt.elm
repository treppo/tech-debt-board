module TechDebt exposing (..)

import Html exposing (Attribute, Html, body, input, li, main_, ol, form, text)
import Html.Attributes exposing (value)
import Html.Events as Events exposing (onInput)
import Positive exposing (Positive)


main =
    Html.beginnerProgram
        { model = initialModel
        , view = view
        , update = update
        }


type alias Model =
    { entries : List Entry
    , newDescription : String
    , uid : Int
    }


initialModel : Model
initialModel =
    { entries = []
    , newDescription = ""
    , uid = 0
    }


type alias Entry =
    { id : Int
    , description : String
    }


newEntry : Int -> String -> Entry
newEntry id description =
    { id = id, description = description }


type Msg
    = Reset
    | AddEntry
    | UpdateDescription String


update : Msg -> Model -> Model
update msg model =
    case msg of
        Reset ->
            initialModel

        AddEntry ->
            { model
                | uid = model.uid + 1
                , newDescription = ""
                , entries =
                    model.entries ++ [ newEntry model.uid model.newDescription ]
            }

        UpdateDescription description ->
            { model | newDescription = description }


view : Model -> Html Msg
view model =
    body []
        [ form [ Events.onSubmit AddEntry ]
            [ input
                [ onInput UpdateDescription
                , value model.newDescription
                ]
                []
            , ol [] <|
                List.map listEntry model.entries
            ]
        ]


listEntry : Entry -> Html Msg
listEntry entry =
    li []
        [ text entry.description ]
