import React from "react";
import { validateCheckStep1, handleFocus } from "../../apis/validate.js";

export default function SignupStep1({ next, formData, handleCheck }) {
  return (
    <div className="signup">
      <div className="signupstep1-yakgwan-agree">
        <p className="signupstep1-yakgwan">약관동의</p>
        <p>회원가입에 필요한 약관에 동의해주세요</p>
      </div>
      <div className="all-agree-warning">
        <div className="all-agree-ok">
          <input
            type="checkbox"
            onChange={(e) => handleCheck("all", e.target.checked)}
            onFocus={() => handleFocus("all")}
          />
          <span>모두 동의합니다.</span>
        </div>
        <span className="all-agree-warning-letter ">
          전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,
          개별적으로도 동의를 선택하실 수 있습니다. <br />
          선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
        </span>
      </div>

      <div className="service-agreement">
        <p>서비스 약관 동의</p>
        <textarea>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
          nobis, aspernatur ratione reprehenderit distinctio deserunt eveniet
          debitis, quibusdam repudiandae possimus deleniti. Laudantium dolor
          esse obcaecati laboriosam ullam! Ullam, molestias error! Expedita
          maiores impedit fugiat accusamus sed qui unde ullam veritatis
          distinctio, mollitia est tempora commodi voluptate ipsa quis placeat
          dolorem illo eaque dicta ducimus dolorum? Magnam expedita voluptas
          similique est? Incidunt nemo nulla placeat natus voluptatibus magnam
          impedit quo exercitationem saepe harum laboriosam repellendus, alias
          deserunt, corporis sed iusto iste doloribus aliquid ea. Optio, minima?
          Reprehenderit, dolorem esse? Quia, quasi! Harum iure deserunt eos non
          doloribus nemo blanditiis at enim, atque nobis. Perferendis eaque
          expedita esse dolorem odit enim cupiditate, accusamus voluptas
          adipisci, laborum ducimus soluta iure corrupti et aperiam! Accusantium
          esse a molestias commodi repellendus. Dolorum tempora beatae commodi
          soluta! Cumque, vero aliquam eum modi tempora aperiam eius autem, id
          fuga amet doloribus dicta itaque temporibus porro labore nisi. Hic
          quis quod fuga et consequatur quae maiores placeat dolorem, enim dolor
          eius tempora! Odio facilis minima, natus asperiores mollitia quaerat
          officia officiis! Optio itaque, rem libero dicta sint vel! Veritatis,
          perferendis maiores. Asperiores nobis itaque dolores sit quod modi aut
          repellat illum! Perspiciatis nisi saepe similique dicta dolorem porro
          assumenda laudantium corrupti sunt, consequuntur, dolor modi
          exercitationem officiis ducimus? Aperiam, sapiente eligendi commodi ea
          at odit iste saepe omnis, dolorum voluptatibus ducimus quasi eius
          doloribus rem ad voluptas ipsa molestiae harum. Distinctio vero eos
          laboriosam illo voluptatum vitae eligendi! Voluptatibus velit
          reprehenderit repellendus, eum cumque similique quasi, deleniti optio
          ducimus ipsa nisi, consequatur corrupti nulla excepturi numquam facere
          neque doloribus? Maiores deleniti unde veniam. Odit a nemo obcaecati
          nostrum! Cum temporibus explicabo possimus, mollitia assumenda sequi
          incidunt neque odio, quae delectus asperiores distinctio alias dolor
          vel debitis excepturi rerum deserunt. Repellat nisi eos odit
          temporibus possimus delectus, eius dolorum! Beatae natus maxime
          accusamus! Ipsum quisquam, inventore corporis eaque dolore illum
          expedita? Ipsam, animi esse quod dolorem quos accusantium, modi
          numquam tempora, totam iure reiciendis? At commodi odio voluptatibus
          maxime? Odio, omnis atque. Animi, quod ullam! Aut dolorem numquam
          soluta quibusdam ducimus dicta deserunt rerum ipsum, repudiandae,
          omnis architecto quis dolorum itaque, accusantium delectus sapiente
          eligendi nemo mollitia asperiores non. Libero, aut. Id non eos,
          reiciendis vel similique repudiandae, commodi quo explicabo quas
          inventore dolorum excepturi itaque aut! Nisi numquam necessitatibus
          commodi maxime a nostrum ducimus. Nobis sunt quo placeat! Sit sint
          accusantium et illum repudiandae quaerat blanditiis obcaecati,
          voluptatibus totam reprehenderit ipsa explicabo accusamus ratione
          molestiae tenetur distinctio harum est facilis qui minus? Asperiores,
          cumque numquam. Mollitia, nobis quibusdam! Doloremque, sequi. Dicta et
          quisquam dolor rerum odio eveniet nobis dolorum fuga, odit ratione
          maiores dignissimos temporibus mollitia eos optio incidunt saepe
          provident. Cumque reprehenderit, amet odit eveniet modi ratione? Ea
          molestiae modi molestias consectetur quasi dolorum aperiam commodi.
          Expedita, veritatis voluptatibus illo culpa iste, architecto incidunt
          dolorem reiciendis aperiam repellat possimus eveniet similique unde.
          Odio ex repellat ducimus numquam. Eveniet officia veritatis,
          doloremque exercitationem, culpa veniam dolores accusantium modi iusto
          ea ducimus officiis esse voluptate facere saepe repellat. Molestiae
          obcaecati repellendus, cumque magnam veniam minima sed unde quasi
          dolor. Obcaecati ad expedita doloremque debitis, eveniet voluptatum,
          enim quam accusamus itaque ullam ex reprehenderit, tempora assumenda
          aliquam laboriosam ipsam! Quae dolorum fugit dolore obcaecati nam ut
          officiis hic quam exercitationem. Reprehenderit totam ut, possimus ad
          eveniet quae sit tenetur numquam praesentium rerum dignissimos ipsum
          delectus, eligendi ullam asperiores molestiae? Corporis nobis totam,
          quae cumque ea maxime tempora aspernatur fugit excepturi. Quasi
          recusandae fugiat similique laborum enim rerum sunt qui omnis
          laudantium ullam? At, doloribus. Nobis beatae reprehenderit quas
          provident qui laboriosam neque aliquam! Non culpa sed neque, illum
          officia saepe! Quae sint ex sed labore, commodi praesentium ullam
          expedita ducimus, aut eaque mollitia explicabo accusamus iste dolores
          minus tempore quam, quibusdam fugiat. Illo praesentium earum maiores
          labore fugiat eius placeat. Id sint, dolore inventore, obcaecati
          officiis itaque nobis nihil aspernatur ipsum maiores libero rem
          blanditiis, quo mollitia officia. Numquam sed, vero tenetur iure saepe
          minima quibusdam qui sequi facilis modi! Sit assumenda temporibus
          sequi! Ea obcaecati itaque consectetur illo in quaerat molestias
          delectus! Reiciendis vel delectus ex facere provident officia modi
          temporibus qui unde, nesciunt corporis exercitationem porro quas non.
          Quasi quidem a nihil maiores et harum non provident sunt minima! Natus
          consequuntur temporibus ipsam soluta omnis deserunt minima,
          dignissimos non, mollitia laborum sed facere vitae corrupti voluptate
          amet possimus. Voluptate ratione assumenda enim optio magnam corrupti
          vel veritatis nulla. Eos cumque tenetur consequatur blanditiis porro,
          minus dignissimos quaerat sequi voluptate magni assumenda voluptatem
          voluptas illo maxime nam alias praesentium? Eius, eveniet animi fuga
          quasi soluta expedita in porro doloribus. Dignissimos quaerat
          necessitatibus, officia minima similique ab optio animi dolore?
          Perferendis quia ratione numquam dicta asperiores veritatis
          laboriosam? Vero, odit? Et quos quod voluptatum culpa facere
          consectetur quaerat dolore iusto temporibus sit alias molestias odit,
          tempora similique deleniti velit voluptates ipsum qui aliquam rem
          corrupti totam nisi magnam. Atque, eos. Maxime ratione perspiciatis,
          omnis est, quia aliquam nobis delectus officiis temporibus alias natus
          laboriosam. Eos consectetur sunt a, numquam beatae et voluptas ducimus
          perferendis? Quaerat dolores molestiae quo harum tempore. Culpa
          placeat iusto excepturi? Vel, magnam hic! Voluptas, adipisci! Sapiente
          neque debitis voluptas quis odio quisquam ratione eum eos modi ut,
          minima corrupti quas, exercitationem nobis culpa aliquam. Aperiam,
          corrupti! A quam hic assumenda deserunt illo aut recusandae molestias
          sed sint vel repellat dolore sit totam, error unde? Provident, saepe
          autem! Officia, quibusdam saepe nulla provident suscipit sequi eaque
          libero! Dolorum nam tempora iste non expedita consectetur tempore,
          officia distinctio nisi officiis blanditiis consequuntur, ratione esse
          architecto repellat voluptatum rem soluta omnis modi iure sed
          praesentium et reprehenderit repudiandae? Repudiandae! Quae
          dignissimos modi fuga repellat atque officiis eius nemo. Voluptatibus
          dolore iusto accusantium, culpa nemo obcaecati aliquid commodi alias
          porro omnis corporis consequatur ad ea ullam repudiandae fugit.
          Aperiam, voluptatum. Dolores magnam impedit nostrum ad eveniet
          perspiciatis molestiae delectus sapiente autem reprehenderit? Alias
          molestias, repellendus optio animi at ipsum voluptates distinctio sit
          quis assumenda est eveniet, ut minima quae consequuntur! Ab animi unde
          architecto at ullam maiores id explicabo. Eligendi ea neque corporis
          illum consequatur non dignissimos minus iure accusantium vero, aliquid
          repudiandae architecto ratione ipsam dolore vitae, commodi hic?
          Aspernatur quidem nobis itaque adipisci vero blanditiis veritatis
          delectus consectetur, dolorum alias fugiat nemo repellat fuga maiores
          nulla eaque obcaecati ipsam repellendus, magni in corrupti eveniet,
          excepturi minima illum. Officia. Fugiat sed sint illum. Sapiente
          aliquam suscipit sunt autem tempore recusandae quisquam hic dolor
          quaerat temporibus nam, molestias minima nostrum exercitationem
          aperiam. Culpa optio atque debitis incidunt quas. Atque, eum. Possimus
          voluptas consequatur et repellendus harum expedita impedit accusamus
          error aut quibusdam nemo rerum distinctio eligendi molestiae quasi
          alias eos sapiente quod, sequi animi? Ratione repudiandae illo aperiam
          facere temporibus. Repudiandae in officiis maiores, accusantium animi,
          dolore molestias cumque ipsa ipsum sit a pariatur? Vitae officiis
          beatae ratione vero asperiores labore tempora odit reiciendis cumque
          quam, adipisci dolorem totam reprehenderit. Adipisci perferendis
          officiis suscipit explicabo amet exercitationem cumque nam inventore,
          debitis animi recusandae velit similique nulla culpa ratione
          repudiandae illo doloremque rerum tenetur sunt quam! Doloribus unde
          aliquam velit molestias. Dignissimos voluptatum consequuntur voluptas
          hic exercitationem. Culpa, eveniet nostrum voluptatem repudiandae
          itaque soluta? Iste aliquam quia temporibus libero atque sed, dolores
          odio adipisci magni, iure accusantium! Sint provident nam dolorum?
          Perspiciatis ipsum laboriosam voluptatibus enim quia similique iste
          optio! Consequuntur quas adipisci maiores, repellat et, ipsa
          accusantium recusandae veniam distinctio dolores eveniet mollitia
          necessitatibus illo modi expedita sint magni repellendus. Quasi, rem?
          Natus quod quos rem, accusamus et possimus, ex cumque id nisi
          praesentium labore nesciunt minima a error libero mollitia magnam eos
          exercitationem consequatur dicta tempora! Alias, nihil accusantium.
          Veniam dolore fugit qui, in laudantium nostrum optio quae rerum unde
          earum omnis perspiciatis pariatur nobis sint tenetur possimus ratione
          cum. Placeat odit corrupti facere qui similique animi maiores
          consectetur! Aspernatur unde officiis modi quis delectus illo
          veritatis quisquam corporis id, architecto eaque repellat ad pariatur
          molestiae quibusdam, dolores nemo nisi ullam dolorem porro veniam
          ipsam! Rerum veniam nobis commodi. Perferendis est placeat assumenda
          consequatur aperiam ipsum iste inventore nesciunt dolore harum! Sed
          sint dignissimos ex dolorum cum. Non libero voluptate, est doloribus
          officia error similique mollitia vitae soluta tempore. Eos repudiandae
          atque placeat omnis nulla quae tempore est asperiores illo modi
          voluptate nisi, praesentium quidem voluptatum esse id perspiciatis
          veritatis, rem nesciunt, recusandae sunt quis? Molestiae nemo ea
          aperiam. Labore, laudantium iusto. A, labore corrupti reiciendis quasi
          dolore, optio rem alias, tenetur in dolor vel quia pariatur quas.
          Labore error voluptate porro soluta voluptas necessitatibus impedit
          libero ut praesentium! Veniam modi eius iste illo doloremque sapiente
          voluptas dignissimos. Odit fugit laudantium veniam iusto! Sint minus
          eaque dolore, error cum exercitationem eius quibusdam et facere?
          Officiis exercitationem quae facere fugiat! Exercitationem quos
          impedit, corrupti ducimus quam, doloremque a, vero nisi cum aliquam
          culpa architecto repellendus quibusdam cumque sint alias eveniet.
          Maxime sint quam blanditiis eos, atque sapiente necessitatibus aperiam
          aspernatur! Earum temporibus, incidunt maxime, error quas excepturi
          expedita at voluptatibus, sunt distinctio illum. Architecto, illo
          aliquid perspiciatis consectetur totam natus expedita cum molestias
          repellat nisi quibusdam, sit nihil tenetur deserunt?
        </textarea>
        <div>
          <input
            type="checkbox"
            name="service"
            id="service"
            checked={formData.service}
            onChange={() => handleCheck("service")}
            onFocus={() => handleFocus("service")}
          />
          <span>동의합니다.</span>
        </div>
      </div>
      <div className="personal-agreement ">
        <p>개인정보 수집 및 이용 동의</p>
        <textarea>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum in
          optio qui modi ipsum cupiditate voluptatem quibusdam magni similique.
          Doloribus itaque dolorum magni iste quo ad alias magnam voluptates
          provident.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laborum in optio qui modi ipsum cupiditate voluptatem quibusdam magni
          similique. Doloribus itaque dolorum magni iste quo ad alias magnam
          voluptates provident.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Laborum in optio qui modi ipsum cupiditate
          voluptatem quibusdam magni similique. Doloribus itaque dolorum magni
          iste quo ad alias magnam voluptates provident.Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Laborum in optio qui modi ipsum
          cupiditate voluptatem quibusdam magni similique. Doloribus itaque
          dolorum magni iste quo ad alias magnam voluptates provident.Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Laborum in optio
          qui modi ipsum cupiditate voluptatem quibusdam magni similique.
          Doloribus itaque dolorum magni iste quo ad alias magnam voluptates
          provident.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laborum in optio qui modi ipsum cupiditate voluptatem quibusdam magni
          similique. Doloribus itaque dolorum magni iste quo ad alias magnam
          voluptates provident.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Laborum in optio qui modi ipsum cupiditate
          voluptatem quibusdam magni similique. Doloribus itaque dolorum magni
          iste quo ad alias magnam voluptates provident.Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Laborum in optio qui modi ipsum
          cupiditate voluptatem quibusdam magni similique. Doloribus itaque
          dolorum magni iste quo ad alias magnam voluptates provident.Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Laborum in optio
          qui modi ipsum cupiditate voluptatem quibusdam magni similique.
          Doloribus itaque dolorum magni iste quo ad alias magnam voluptates
          provident.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laborum in optio qui modi ipsum cupiditate voluptatem quibusdam magni
          similique. Doloribus itaque dolorum magni iste quo ad alias magnam
          voluptates provident.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Laborum in optio qui modi ipsum cupiditate
          voluptatem quibusdam magni similique. Doloribus itaque dolorum magni
          iste quo ad alias magnam voluptates provident.Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Laborum in optio qui modi ipsum
          cupiditate voluptatem quibusdam magni similique. Doloribus itaque
          dolorum magni iste quo ad alias magnam voluptates provident.Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Laborum in optio
          qui modi ipsum cupiditate voluptatem quibusdam magni similique.
          Doloribus itaque dolorum magni iste quo ad alias magnam voluptates
          provident.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laborum in optio qui modi ipsum cupiditate voluptatem quibusdam magni
          similique. Doloribus itaque dolorum magni iste quo ad alias magnam
          voluptates provident.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Laborum in optio qui modi ipsum cupiditate
          voluptatem quibusdam magni similique. Doloribus itaque dolorum magni
          iste quo ad alias magnam voluptates provident.Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Laborum in optio qui modi ipsum
          cupiditate voluptatem quibusdam magni similique. Doloribus itaque
          dolorum magni iste quo ad alias magnam voluptates provident.
        </textarea>
        <div>
          <input
            type="checkbox"
            name="personal"
            id="personal"
            checked={formData.personal}
            onChange={() => handleCheck("personal")}
            onFocus={() => handleFocus("personal")}
          />
          <span>동의합니다.</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => validateCheckStep1(next, formData)}
        className="signup-next-button"
        style={{ cursor: "pointer" }}
      >
        다음
      </button>
    </div>
  );
}
