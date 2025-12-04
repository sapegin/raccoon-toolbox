unit insertimage;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls;

type
  TInsertImgFrm = class(TForm)
    SrcEdit: TEdit;
    AltEdit: TEdit;
    WidthEdit: TEdit;
    HeightEdit: TEdit;
    HSpaceEdit: TEdit;
    VSpaceEdit: TEdit;
    BorderEdit: TEdit;
    AlignCombo: TComboBox;
    OklButton: TButton;
    CancelButton: TButton;
    Label1: TLabel;
    Label2: TLabel;
    Label3: TLabel;
    Label4: TLabel;
    Label5: TLabel;
    Label6: TLabel;
    Label7: TLabel;
    Label8: TLabel;
    Bevel1: TBevel;
    procedure CancelButtonClick(Sender: TObject);
    procedure OklButtonClick(Sender: TObject);
    procedure FormActivate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  InsertImgFrm: TInsertImgFrm;

implementation

uses Unit1;

{$R *.dfm}

procedure TInsertImgFrm.CancelButtonClick(Sender: TObject);
begin
  close;
end;

procedure TInsertImgFrm.OklButtonClick(Sender: TObject);
var
  imgtext : string;
  srctext, alttext, widthtext, heighttext, vspacetext, hspacetext, bordertext, aligntext : string;
begin
  srctext    := SrcEdit.Text;
  alttext    := AltEdit.Text;
  widthtext  := WidthEdit.Text;
  heighttext := HeightEdit.Text;
  vspacetext := VSpaceEdit.Text;
  hspacetext := HSpaceEdit.Text;
  bordertext := BorderEdit.Text;
  aligntext  := AlignCombo.Text;

  if srctext <> '' then
  begin
    imgtext := '<img src=' + srctext;
    if (pos(' ', alttext) > 0) or (alttext = '') then
      alttext := '"' + alttext + '"';
    if widthtext <> '' then
      imgtext := imgtext + ' width=' + widthtext;
    if heighttext <> '' then
      imgtext := imgtext + ' height=' + heighttext;
    if hspacetext <> '' then
      imgtext := imgtext + ' hspace=' + hspacetext;
    if vspacetext <> '' then
      imgtext := imgtext + ' vspace=' + vspacetext;
    if aligntext <> '' then
      imgtext := imgtext + ' align=' + aligntext;
    imgtext := imgtext + ' border=' + bordertext + ' alt=' + alttext + '>';

    with frmMain do
    begin
      Highlight(1);
      RichEdit.SelText := imgtext;
    end;
    close;
  end
  else
    application.MessageBox('Не задано имя файла.', 'n-editor', MB_OK + MB_ICONERROR);
end;

procedure TInsertImgFrm.FormActivate(Sender: TObject);
begin
  SrcEdit.Text := '';
  AltEdit.Text := '';
  WidthEdit.Text := '';
  HeightEdit.Text := '';
  VSpaceEdit.Text := '';
  HSpaceEdit.Text := '';
  BorderEdit.Text := '0';
  AlignCombo.Text := '';
end;

end.
